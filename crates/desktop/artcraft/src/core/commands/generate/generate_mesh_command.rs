use crate::core::commands::generate::omni::{self, Modality, OmniRequest, OmniResult};
use crate::core::commands::generate::omni::dispatch::local_error;
use tauri::AppHandle;

#[tauri::command]
pub async fn generate_mesh_command(request: OmniRequest, app: AppHandle) -> OmniResult {
  #[cfg(feature = "fal-proxy")]
  let request = crate::fal_proxy_integration::prepare_references(request, &app).await?;
  #[cfg(feature = "fal-proxy")]
  if request.provider == Some(enums::common::generation_provider::GenerationProvider::FalProxy) {
    return crate::fal_proxy_integration::generate(request, Modality::Mesh, &app).await;
  }
  if !request.uses_artcraft() {
    return Err(local_error("No direct provider adapter is configured for this modality."));
  }
  omni::generate(request, Modality::Mesh, &app).await
}
