use crate::core::state::data_dir::app_data_root::AppDataRoot;
use artcraft_client::utils::api_host::ApiHost;
use errors::AnyhowResult;
use reqwest::Url;

#[derive(Clone)]
pub struct AppEnvConfigs {
  pub storyteller_host: ApiHost,
}

impl AppEnvConfigs {
  pub fn load_from_filesystem(_root: &AppDataRoot) -> AnyhowResult<Self> {
    let value = std::env::var("ARTCRAFT_PROXY_URL")
      .unwrap_or_else(|_| "http://localhost:12345".into());
    let origin = Url::parse(&value)?;
    let local = matches!(origin.host_str(), Some("localhost" | "127.0.0.1" | "[::1]"));
    anyhow::ensure!(origin.scheme() == "https" || (origin.scheme() == "http" && local),
      "ARTCRAFT_PROXY_URL must use HTTPS (HTTP is allowed on loopback only)");
    anyhow::ensure!(origin.username().is_empty() && origin.password().is_none()
      && origin.path() == "/" && origin.query().is_none() && origin.fragment().is_none(),
      "ARTCRAFT_PROXY_URL must be an origin without credentials, path, query or fragment");
    log::info!("Using fal Proxy: {}", origin.origin().ascii_serialization());
    Ok(Self { storyteller_host: ApiHost::Proxy { origin } })
  }
}
