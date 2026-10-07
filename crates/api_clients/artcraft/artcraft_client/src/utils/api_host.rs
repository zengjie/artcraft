
use artcraft_client_identity::origins::{ARTCRAFT_DESKTOP_DEVELOPMENT_ORIGIN, ARTCRAFT_DESKTOP_ORIGIN};

const HTTP_SCHEME: &str = "http";

const HTTPS_SCHEME: &str = "https";

#[derive(Clone, Debug)]
pub enum ApiHost {
  Storyteller,
  /// An independently authenticated compatible provider, never the official host.
  Proxy { origin: String },
  FakeYou,
  Localhost { port: u32 },
}

impl ApiHost {
  pub fn to_api_hostname(&self) -> String {
    match self {
      ApiHost::Proxy { origin } => origin.split_once("://").map(|(_, host)| host).unwrap_or(origin).to_owned(),
      ApiHost::Storyteller => "api.storyteller.ai".to_string(),
      ApiHost::FakeYou => "api.fakeyou.com".to_string(),
      ApiHost::Localhost { port } => format!("localhost:{}", port),
    }
  }

  pub fn to_api_hostname_and_scheme(&self) -> String {
    match self {
      ApiHost::Proxy { origin } => origin.clone(),
      ApiHost::Storyteller => "https://api.storyteller.ai".to_string(),
      ApiHost::FakeYou => "https://api.fakeyou.com".to_string(),
      ApiHost::Localhost { port } => format!("http://localhost:{}", port),
    }
  }
  
  /// The `Origin` the desktop client declares to this API.
  pub fn request_origin(&self) -> &'static str {
    match self {
      ApiHost::Proxy { .. } => ARTCRAFT_DESKTOP_ORIGIN,
      ApiHost::Storyteller => ARTCRAFT_DESKTOP_ORIGIN,
      ApiHost::FakeYou => ARTCRAFT_DESKTOP_ORIGIN,
      ApiHost::Localhost { .. } => ARTCRAFT_DESKTOP_DEVELOPMENT_ORIGIN,
    }
  }

  pub fn scheme(&self) -> &'static str {
    match self {
      ApiHost::Proxy { origin } => if origin.starts_with("http://") { HTTP_SCHEME } else { HTTPS_SCHEME },
      ApiHost::Storyteller => HTTPS_SCHEME,
      ApiHost::FakeYou => HTTPS_SCHEME,
      ApiHost::Localhost { .. } => HTTP_SCHEME,
    }
  }
}
