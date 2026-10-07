use super::*;
use std::io::{Read, Write};
use std::net::TcpListener;

#[tokio::test]
async fn credentials_stay_native_and_bound_to_the_instance_across_restart() {
  let listener = TcpListener::bind("127.0.0.1:0").unwrap();
  let origin = format!("http://{}", listener.local_addr().unwrap());
  let session_path = std::env::temp_dir().join(format!("fal-provider-isolation-{}.json", std::process::id()));
  let worker = std::thread::spawn(move || {
    for (index, response) in [
      json!({"status":"redeemed", "maybe_signed_session":"proxy-only-test-session"}),
      json!({"logged_in":true}),
      json!({"success":true}),
    ].iter().enumerate() {
      let (mut stream, _) = listener.accept().unwrap();
      stream.set_read_timeout(Some(Duration::from_secs(5))).unwrap();
      let mut buffer = [0; 8192];
      let count = stream.read(&mut buffer).unwrap();
      let request = String::from_utf8_lossy(&buffer[..count]).to_lowercase();
      assert!(!request.contains("cookie:"));
      if index > 0 { assert!(request.contains("session: proxy-only-test-session")); }
      let body = response.to_string();
      write!(stream, "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}", body.len(), body).unwrap();
    }
  });
  let provider = ProxyProvider::new(&origin, session_path.clone()).unwrap();
  let result = provider.execute("poll_login", json!({"body":{"device_token":"test"}})).await.unwrap();
  assert!(result.get("maybe_signed_session").is_none());
  drop(provider);
  let other = ProxyProvider::new("https://another-proxy.example", session_path.clone()).unwrap();
  assert!(other.session.lock().await.is_none());
  let restored = ProxyProvider::new(&origin, session_path.clone()).unwrap();
  assert_eq!(restored.execute("session", json!({})).await.unwrap()["logged_in"], true);
  restored.execute("logout", json!({})).await.unwrap();
  assert!(!session_path.exists());
  assert!(restored.session.lock().await.is_none());
  worker.join().unwrap();
}
