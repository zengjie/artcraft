//! Adapter into the existing desktop task queue and editor completion events.
use crate::core::commands::enqueue::task_enqueue_success::TaskEnqueueSuccess;
use crate::core::commands::generate::omni::{Modality, OmniRequest, OmniResult};
use crate::core::commands::generate::omni::dispatch::{job_tokens, local_error, resolve_image_inputs, OmniResponse};
use crate::core::events::basic_sendable_event_trait::BasicSendableEvent;
use crate::core::events::generation_events::{common::GenerationModel, generation_enqueue_success_event::GenerationEnqueueSuccessEvent};
use crate::core::state::{app_env_configs::app_env_configs::AppEnvConfigs, task_database::TaskDatabase};
use crate::services::storyteller::threads::storyteller_task_polling_thread::{handle_storyteller_successful_job::handle_successful_job, handle_storyteller_failed_job::handle_failed_job};
use artcraft_client::credentials::{storyteller_credential_set::StorytellerCredentialSet, storyteller_session_cookie::StorytellerSessionCookie};
use artcraft_client::utils::api_host::ApiHost;
use artcraft_api_defs::jobs::list_session_jobs::ListSessionJobsItem;
use enums::{common::{generation_provider::GenerationProvider, job_status_plus::JobStatusPlus}, tauri::tasks::task_status::TaskStatus};
use fal_proxy_provider::ProxyProvider;
use serde_json::{json, Value};
use sqlite_tasks::queries::list_tasks_by_provider_and_tokens::{list_tasks_by_provider_and_tokens, ListTasksArgs};
use tauri::{AppHandle, Manager};
use uuid_utils::uuid::generate_random_uuid;

pub async fn context(app: &AppHandle) -> Result<(AppEnvConfigs, StorytellerCredentialSet), String> {
  let proxy = app.state::<ProxyProvider>();
  let session = proxy.session_token().await.ok_or("请先在账号设置中使用飞书登录 fal Proxy")?;
  Ok((AppEnvConfigs { storyteller_host: ApiHost::Proxy { origin: proxy.origin().to_owned() } },
    StorytellerCredentialSet::initialize_with_just_cookie(StorytellerSessionCookie::new(session))))
}

pub async fn generate(request: OmniRequest, modality: Modality, app: &AppHandle) -> OmniResult {
  let proxy = app.state::<ProxyProvider>();
  let session = proxy.execute("session", json!({})).await.map_err(local_error)?;
  let owner = session["user"]["user_token"].as_str().ok_or_else(|| local_error("请先使用飞书登录 fal Proxy"))?;
  let (config, creds) = context(app).await.map_err(local_error)?;
  let mut fields = request.api_fields(modality);
  if modality == Modality::Image {
    if request.fields.get("enable_system_prompt").and_then(Value::as_bool) == Some(true) {
      let scene = request.fields.get("scene_image_media_token").is_some_and(|v| !v.is_null()) || request.fields.get("scene_image_raw_bytes").is_some_and(|v| !v.is_null());
      fields.insert("editor_context".into(), json!(if scene { "scene" } else { "canvas" }));
    }
    resolve_image_inputs(&mut fields, Some(&creds), &config.storyteller_host).await?;
  }
  fields.remove("estimate_only");
  for (old, new) in [("adjust_horizontal_angle", "horizontal_angle"), ("adjust_vertical_angle", "vertical_angle"), ("adjust_zoom", "zoom")] {
    if let Some(value) = fields.remove(old) { fields.insert(new.into(), value); }
  }
  if fields.get("idempotency_token").is_none_or(Value::is_null) {
    fields.insert("idempotency_token".into(), Value::String(generate_random_uuid()));
  }
  let model = request.model().map(|model| GenerationModel::Unknown(model.into()));
  let response = proxy.execute("generate", json!({"modality": modality.as_str(), "body": fields})).await.map_err(local_error)?;
  let tokens = job_tokens(&response);
  if tokens.is_empty() { return Err(local_error("Proxy accepted the request without a job ID. Check history before retrying.")); }
  for token in tokens {
    let success = TaskEnqueueSuccess {
      task_type: if request.model() == Some("fal_birefnet") { enums::tauri::tasks::task_type::TaskType::BackgroundRemoval } else { modality.task_type() }, model: model.clone(), provider: GenerationProvider::FalProxy,
      provider_job_id: Some(token),
      // Provider-specific opaque routing metadata. Never interpreted as URLs by the Proxy poller.
      maybe_queue_status_url: Some(proxy.origin().to_owned()), maybe_queue_response_url: Some(owner.to_owned()),
      maybe_prompt_token: None,
    };
    if let Err(err) = success.insert_into_task_database_with_frontend_payload(&app.state::<TaskDatabase>(), request.frontend_caller, request.frontend_subscriber_id.as_deref(), request.frontend_subscriber_payload.as_deref()).await {
      log::error!("Accepted fal Proxy job could not be persisted: {}", err);
    }
    GenerationEnqueueSuccessEvent { action: success.to_frontend_event_action(), service: success.to_frontend_event_service(), model: success.model }.send_infallible(app);
  }
  Ok(OmniResponse(response).into())
}

pub async fn estimate(request: OmniRequest, modality: Modality, app: &AppHandle) -> OmniResult {
  let response = app.state::<ProxyProvider>().execute("estimate", json!({"modality": modality.as_str(), "body": request.api_fields(modality)})).await.map_err(local_error)?;
  Ok(OmniResponse(response).into())
}

pub async fn poll(app: AppHandle) {
  loop {
    tokio::time::sleep(std::time::Duration::from_secs(5)).await;
    if let Err(error) = poll_once(&app).await { log::debug!("fal Proxy task poll: {}", error); }
  }
}

async fn poll_once(app: &AppHandle) -> Result<(), String> {
  let proxy = app.state::<ProxyProvider>();
  let (config, creds) = context(app).await?;
  let session = proxy.execute("session", json!({})).await?;
  let owner = session["user"]["user_token"].as_str().ok_or("Proxy logged out")?;
  let response = proxy.execute("jobs", json!({})).await?;
  let database = app.state::<TaskDatabase>();
  let tasks = list_tasks_by_provider_and_tokens(ListTasksArgs { db: database.get_connection(), provider: GenerationProvider::FalProxy, provider_job_ids: None }).await.map_err(|e| e.to_string())?.tasks;
  for value in response["jobs"].as_array().ok_or("Invalid Proxy jobs response")? {
    let Some(task) = tasks.iter().find(|task| task.provider_job_id.as_deref() == value["job_token"].as_str()
      && task.queue_status_url.as_deref() == Some(proxy.origin()) && task.queue_response_url.as_deref() == Some(owner)) else { continue };
    if matches!(task.status, TaskStatus::CompleteSuccess | TaskStatus::CompleteFailure) { continue; }
    let job: ListSessionJobsItem = serde_json::from_value(value.clone()).map_err(|e| e.to_string())?;
    match job.status.status {
      JobStatusPlus::CompleteSuccess => handle_successful_job(app, &config, Some(&creds), &job, task, &database).await.map_err(|e| e.to_string())?,
      JobStatusPlus::CompleteFailure => handle_failed_job(app, &job, task, &database).await.map_err(|e| e.to_string())?,
      _ => {},
    }
  }
  Ok(())
}

/// Move image references to the explicitly selected provider. A reference token
/// is never sent to the other generation API as if it belonged to that API.
pub async fn prepare_references(mut request: OmniRequest, app: &AppHandle) -> Result<OmniRequest, crate::core::commands::response::failure_response_wrapper::CommandErrorResponseWrapper<String, ()>> {
  use crate::services::storyteller::state::storyteller_credential_manager::StorytellerCredentialManager;
  use crate::core::utils::upload_bytes_to_media_file::upload_image_bytes_as_media_file::upload_image_bytes_as_media_file;
  use artcraft_client::endpoints::media_files::get_media_file::get_media_file;
  use tokens::tokens::media_files::MediaFileToken;
  let to_proxy = request.provider == Some(GenerationProvider::FalProxy);
  let proxy = app.state::<ProxyProvider>();
  let mut references = Vec::new();
  for (key, value) in &request.fields {
    if key.ends_with("media_token") {
      if let Some(token) = value.as_str() { references.push(token.to_owned()); }
    } else if key.ends_with("media_tokens") {
      if let Some(tokens) = value.as_array() { references.extend(tokens.iter().filter_map(Value::as_str).map(str::to_owned)); }
    }
  }
  if references.is_empty() { return Ok(request); }
  if !to_proxy {
    let mut has_proxy = false;
    for token in &references { if proxy.knows_media(token).await { has_proxy = true; break; } }
    if !has_proxy { return Ok(request); }
  }
  let mut owned = std::collections::HashMap::new();
  if proxy.session_token().await.is_some() {
    let query = {
      let mut query = url::form_urlencoded::Serializer::new(String::new());
      for token in &references { query.append_pair("tokens", token); }
      query.finish()
    };
    let response = proxy.execute("read", json!({"path": format!("/v1/media_files/batch?{}", query)})).await.map_err(local_error)?;
    for file in response["media_files"].as_array().into_iter().flatten() {
      if let Some(token) = file["token"].as_str() { owned.insert(token.to_owned(), file.clone()); }
    }
  }
  let official_host = &app.state::<AppEnvConfigs>().storyteller_host;
  let mut replacements = std::collections::HashMap::new();
  for token in references {
    if replacements.contains_key(&token) { continue; }
    let proxy_file = owned.get(&token);
    if !to_proxy && proxy_file.is_none() && !token.starts_with("mf_fpx_") { continue; }
    if to_proxy && proxy_file.is_some() { continue; }
    let url = if to_proxy {
      if token.starts_with("mf_fpx_") { return Err(local_error("参考素材不属于当前 fal Proxy 账号，请重新选择或上传。")); }
      get_media_file(official_host, &MediaFileToken::new_from_str(&token)).await.map_err(local_error)?.media_file.media_links.cdn_url.to_string()
    } else {
      proxy_file.and_then(|file| file["media_links"]["cdn_url"].as_str()).ok_or_else(|| local_error("请登录该素材所属的 fal Proxy 账号后重试。"))?.to_owned()
    };
    let client = reqwest::Client::builder().redirect(reqwest::redirect::Policy::none()).timeout(std::time::Duration::from_secs(60)).build().map_err(local_error)?;
    let mut response = client.get(&url).send().await.map_err(local_error)?.error_for_status().map_err(local_error)?;
    let mut bytes = Vec::new();
    while let Some(chunk) = response.chunk().await.map_err(local_error)? {
      if bytes.len() + chunk.len() > 20 * 1024 * 1024 { return Err(local_error("参考图片超过 20 MB。")); }
      bytes.extend_from_slice(&chunk);
    }
    // The shared uploader labels PNG; normalize actual bytes to match it.
    let image = image::load_from_memory(&bytes).map_err(local_error)?;
    let mut png = std::io::Cursor::new(Vec::new());
    image.write_to(&mut png, image::ImageFormat::Png).map_err(local_error)?;
    let replacement = if to_proxy {
      let result = proxy.execute("upload", json!({"bytes": png.into_inner(), "mime": "image/png"})).await.map_err(local_error)?;
      result["media_file_token"].as_str().ok_or_else(|| local_error("Proxy upload returned no token"))?.to_owned()
    } else {
      let creds = app.state::<StorytellerCredentialManager>().get_credentials().map_err(local_error)?.ok_or_else(|| local_error("使用官方服务需要登录 ArtCraft 账号。"))?;
      upload_image_bytes_as_media_file(&creds, official_host, png.into_inner()).await.map_err(|err| local_error(format!("{:?}", err)))?.to_string()
    };
    replacements.insert(token, replacement);
  }
  for (key, value) in request.fields.iter_mut() {
    if key.ends_with("media_token") {
      if let Some(new) = value.as_str().and_then(|token| replacements.get(token)) { *value = json!(new); }
    } else if key.ends_with("media_tokens") {
      if let Some(tokens) = value.as_array_mut() {
        for token in tokens { if let Some(new) = token.as_str().and_then(|token| replacements.get(token)) { *token = json!(new); } }
      }
    }
  }
  Ok(request)
}
