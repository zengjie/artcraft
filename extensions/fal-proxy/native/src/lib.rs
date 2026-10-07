//! A separate provider instance: no ArtCraft client, cookies, or database dependency.
use reqwest::{Client, Method, Url};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::{fs, path::PathBuf, time::Duration};
use tokio::sync::Mutex;

pub struct ProxyProvider {
  origin: String,
  client: Client,
  session_path: PathBuf,
  session: Mutex<Option<String>>,
  known_media: Mutex<std::collections::HashSet<String>>,
}

#[derive(Serialize, Deserialize)]
struct SavedSession {
  origin: String,
  session: String,
}

impl ProxyProvider {
  pub fn new(origin: &str, session_path: PathBuf) -> Result<Self, String> {
    let origin = validate_origin(origin)?;
    let saved = fs::read(&session_path).ok()
      .and_then(|bytes| serde_json::from_slice::<SavedSession>(&bytes).ok())
      .filter(|saved| saved.origin == origin)
      .map(|saved| saved.session);
    let mut builder = Client::builder().redirect(reqwest::redirect::Policy::none())
      .timeout(Duration::from_secs(60));
    if is_loopback(&Url::parse(&origin).map_err(|_| "Invalid origin")?) {
      builder = builder.no_proxy();
    }
    Ok(Self {
      origin, session_path, session: Mutex::new(saved), known_media: Mutex::new(std::collections::HashSet::new()),
      client: builder.build().map_err(|_| "Cannot initialize Proxy transport")?,
    })
  }

  pub async fn knows_media(&self, token: &str) -> bool {
    token.starts_with("mf_fpx_") || self.known_media.lock().await.contains(token)
  }

  pub fn origin(&self) -> &str { &self.origin }

  /// Native-only credential access for compatible media/completion clients.
  pub async fn session_token(&self) -> Option<String> { self.session.lock().await.clone() }

  pub async fn execute(&self, operation: &str, input: Value) -> Result<Value, String> {
    if operation == "config" {
      return Ok(json!({"provider": "fal_proxy", "instance": self.origin, "protocol_version": 1}));
    }
    let mut session = self.session.lock().await;
    let (method, path) = route(operation, &input)?;
    let mut request = self.client.request(method, format!("{}{path}", self.origin));
    if let Some(value) = session.as_ref() {
      request = request.header("session", value);
    }
    if operation == "upload" {
      let bytes: Vec<u8> = serde_json::from_value(input["bytes"].clone()).map_err(|_| "Invalid upload")?;
      if bytes.is_empty() || bytes.len() > 20 * 1024 * 1024 { return Err("Upload must be 1 byte–20 MB".into()); }
      let mime = input["mime"].as_str().ok_or("Missing media type")?;
      let part = reqwest::multipart::Part::bytes(bytes).file_name("reference")
        .mime_str(mime).map_err(|_| "Invalid media type")?;
      request = request.multipart(reqwest::multipart::Form::new().part("file", part));
    } else if ["login", "poll_login", "logout", "generate", "estimate", "rename_media"].contains(&operation) {
      request = request.json(input.get("body").unwrap_or(&json!({})));
    }
    let response = request.send().await.map_err(|_| "Cannot reach fal Proxy; check connection before retrying generation")?;
    let status = response.status();
    let mut value: Value = response.json().await.map_err(|_| "Invalid Proxy response")?;
    if !status.is_success() {
      if status.as_u16() == 401 { *session = None; self.clear_session()?; }
      return Err(value["error_message"].as_str().unwrap_or("Proxy request failed").to_owned());
    }
    if operation == "login" {
      let url = Url::parse(value["verification_url"].as_str().ok_or("Missing verification URL")?).map_err(|_| "Invalid verification URL")?;
      if url.origin().ascii_serialization() != self.origin || url.path() != "/login/desktop"
        || !url.username().is_empty() || url.password().is_some() || url.query().is_some() {
        return Err("Proxy returned an unexpected login origin".into());
      }
    }
    if operation == "poll_login" {
      if let Some(token) = value["maybe_signed_session"].as_str() {
        self.save_session(token)?;
        *session = Some(token.to_owned());
      }
      if let Some(object) = value.as_object_mut() { object.remove("maybe_signed_session"); }
    }
    if operation == "logout" {
      *session = None;
      self.clear_session()?;
    }
    let mut known = self.known_media.lock().await;
    for file in value["media_files"].as_array().or_else(|| value["results"].as_array()).into_iter().flatten() {
      if let Some(token) = file["token"].as_str() { known.insert(token.to_owned()); }
    }
    if let Some(token) = value["media_file_token"].as_str() { known.insert(token.to_owned()); }
    if operation == "logout" { known.clear(); }
    Ok(value)
  }

  fn save_session(&self, token: &str) -> Result<(), String> {
    let parent = self.session_path.parent().ok_or("Invalid session path")?;
    fs::create_dir_all(parent).map_err(|_| "Cannot create Proxy session directory")?;
    let bytes = serde_json::to_vec(&SavedSession { origin: self.origin.clone(), session: token.into() }).map_err(|_| "Cannot encode session")?;
    let temporary = self.session_path.with_extension("tmp");
    let mut options = fs::OpenOptions::new();
    options.write(true).create(true).truncate(true);
    #[cfg(unix)] {
      use std::os::unix::fs::OpenOptionsExt;
      options.mode(0o600);
    }
    use std::io::Write;
    let mut file = options.open(&temporary).map_err(|_| "Cannot save Proxy session")?;
    file.write_all(&bytes).and_then(|_| file.sync_all()).map_err(|_| "Cannot save Proxy session")?;
    fs::rename(temporary, &self.session_path).map_err(|_| "Cannot persist Proxy session".to_owned())
  }

  fn clear_session(&self) -> Result<(), String> {
    match fs::remove_file(&self.session_path) {
      Ok(()) => Ok(()),
      Err(error) if error.kind() == std::io::ErrorKind::NotFound => Ok(()),
      Err(_) => Err("Cannot remove Proxy session".into()),
    }
  }
}

pub fn validate_origin(value: &str) -> Result<String, String> {
  let url = Url::parse(value).map_err(|_| "Invalid Proxy origin")?;
  if !(url.scheme() == "https" || (url.scheme() == "http" && is_loopback(&url)))
    || url.host_str().is_none() || !url.username().is_empty() || url.password().is_some()
    || url.path() != "/" || url.query().is_some() || url.fragment().is_some() {
    return Err("Proxy requires an HTTPS origin (HTTP allowed on loopback only)".into());
  }
  Ok(url.origin().ascii_serialization())
}

fn is_loopback(url: &Url) -> bool {
  matches!(url.host_str(), Some("localhost" | "127.0.0.1" | "[::1]"))
}

fn route(operation: &str, input: &Value) -> Result<(Method, String), String> {
  let (method, path) = match operation {
    "read" => (Method::GET, read_path(input)?),
    "delete_media" | "rename_media" => {
      let token = input["token"].as_str().filter(|t| valid_token(t)).ok_or("Invalid media token")?;
      if operation == "delete_media" { (Method::DELETE, format!("/v1/media_files/file/{token}")) }
      else { (Method::POST, format!("/v1/media_files/rename/{token}")) }
    },
    "session" => (Method::GET, "/v1/session".into()),
    "login" => (Method::POST, "/v1/login_challenges/create".into()),
    "poll_login" => (Method::POST, "/v1/login_challenges/poll".into()),
    "logout" => (Method::POST, "/v1/logout".into()),
    "capabilities" => (Method::GET, "/v1/proxy/capabilities".into()),
    "jobs" => (Method::GET, "/v1/jobs/session".into()),
    "media" => (Method::GET, "/v1/media_files/list?page_size=100".into()),
    "upload" => (Method::POST, "/v1/media_files/upload/image".into()),
    "generate" | "estimate" => {
      let modality = input["modality"].as_str().ok_or("Missing modality")?;
      if !["image", "video", "audio", "mesh", "splat", "world", "text"].contains(&modality) { return Err("Unsupported modality".into()); }
      let action = if operation == "generate" { "generate" } else { "cost" };
      (Method::POST, format!("/v1/omni_gen/{action}/{modality}"))
    },
    _ => return Err("Unsupported Proxy operation".into()),
  };
  Ok((method, path))
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn origins_reject_credentials_paths_and_remote_http() {
    for origin in ["http://remote.example", "https://user:pass@example.org", "https://example.org/path", "https://example.org?key=x", "https://example.org#x"] {
      assert!(validate_origin(origin).is_err());
    }
    assert_eq!(validate_origin("http://localhost:12345/").unwrap(), "http://localhost:12345");
    assert!(validate_origin("https://proxy.example").is_ok());
  }

  #[test]
  fn read_routes_reject_billing_and_arbitrary_paths() {
    for path in ["https://evil.example/v1/jobs/session", "//evil.example/v1/jobs/session", "/v1/billing/balance", "/v1/session", "/v1/media_files/file/../secret", "/v1/media_files/file/token#secret", "/v1/media_files/file/token/extra"] {
      assert!(read_path(&json!({"path":path})).is_err(), "{path}");
    }
    for path in ["/v1/jobs/session", "/v1/media_files/list?page_size=20", "/v1/media_files/file/mf_fpx_123"] {
      assert_eq!(read_path(&json!({"path":path})).unwrap(), path);
    }
  }

  #[test]
  fn frontend_cannot_choose_urls_or_billing_routes() {
    assert!(route("https://evil.example", &json!({})).is_err());
    assert!(route("generate", &json!({"modality":"../billing"})).is_err());
    assert_eq!(route("generate", &json!({"modality":"image", "url":"https://evil.example"})).unwrap().1, "/v1/omni_gen/generate/image");
  }
}

#[cfg(test)]
mod isolation_tests;

fn valid_token(value: &str) -> bool {
  !value.is_empty() && value.len() <= 160 && value.bytes().all(|c| c.is_ascii_alphanumeric() || c == b'_' || c == b'-')
}

fn read_path(input: &Value) -> Result<String, String> {
  let path = input["path"].as_str().ok_or("Missing read path")?;
  let url = Url::parse(&format!("https://proxy.invalid{path}")).map_err(|_| "Invalid read path")?;
  if url.origin().ascii_serialization() != "https://proxy.invalid" || url.fragment().is_some() { return Err("Invalid read path".into()); }
  let p = url.path();
  let fixed = ["/v1/jobs/session", "/v1/media_files/list", "/v1/media_files/search_session", "/v1/media_files/mesh/list", "/v1/media_files/splat/list", "/v1/media_files/batch"];
  let prefixes = ["/v1/jobs/job/", "/v1/media_files/file/", "/v1/media_files/batch/", "/v1/media_files/batch_gen_redux/", "/v1/media_files/list/user/"];
  if !fixed.contains(&p) && !prefixes.iter().any(|prefix| p.strip_prefix(prefix).is_some_and(valid_token)) { return Err("Unsupported Proxy read path".into()); }
  Ok(format!("{}{}", p, url.query().map(|q| format!("?{q}")).unwrap_or_default()))
}
