use crate::core::state::data_dir::app_data_root::AppDataRoot;
use errors::AnyhowResult;
use sqlite_tasks::connection::TaskDbConnection;

#[derive(Clone)]
pub struct TaskDatabase {
  connection: TaskDbConnection,
}

impl TaskDatabase {
  pub async fn connect(root: &AppDataRoot) -> AnyhowResult<Self> {
    let path = root.state_dir().get_tasks_sqlite_database_path();
    #[cfg(feature = "fal-proxy")]
    let path = path.with_file_name(format!("official_{}", path.file_name().unwrap().to_string_lossy()));
    // Legacy prototype tasks have ambiguous provider IDs. Preserve their database
    // unchanged; Proxy history is recovered from the authenticated Proxy itself.
    let connection = TaskDbConnection::connect_and_migrate(path).await?;
    Ok(Self { connection})
  }

  pub fn get_connection(&self) -> &TaskDbConnection {
    &self.connection
  }
}