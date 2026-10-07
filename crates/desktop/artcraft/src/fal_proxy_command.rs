use fal_proxy_provider::ProxyProvider;
use serde_json::Value;

#[tauri::command]
pub async fn fal_proxy_command(
  provider: tauri::State<'_, ProxyProvider>,
  operation: String,
  input: Value,
) -> Result<Value, String> {
  provider.execute(&operation, input).await
}
