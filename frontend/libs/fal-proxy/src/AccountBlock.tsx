import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@storyteller/ui-button";
import { enabled, proxyCall, useProxySession } from "./provider";

interface Challenge { device_token: string; verification_url: string; confirmation_code: string; expires_at: string }
export function FalProxyAccountBlock() {
  const { session, refresh } = useProxySession();
  const [challenge, setChallenge] = useState<Challenge>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    if (!challenge) return;
    let active = true;
    let timer: number;
    const poll = async () => {
      if (Date.now() >= Date.parse(challenge.expires_at)) { setChallenge(undefined); setError("登录请求已过期，请重试。"); return; }
      try {
        const result = await proxyCall<{ status: string }>("poll_login", { body: { device_token: challenge.device_token } });
        if (!active) return;
        if (result.status === "redeemed") { await refresh(); setChallenge(undefined); return; }
        if (result.status === "failed") { setChallenge(undefined); setError("授权未完成，请重试。"); return; }
      } catch (error) { if (active) setError(String(error)); }
      if (active) timer = window.setTimeout(poll, 3000);
    };
    timer = window.setTimeout(poll, 1000);
    return () => { active = false; clearTimeout(timer); };
  }, [challenge, refresh]);
  if (!enabled) return null;
  const connect = async () => {
    setBusy(true); setError("");
    try {
      if (session?.logged_in) { await proxyCall("logout"); await refresh(); }
      else {
        const next = challenge ?? await proxyCall<Challenge>("login");
        setChallenge(next);
        await invoke("plugin:opener|open_url", { url: next.verification_url });
      }
    } catch (error) { setError(String(error)); }
    finally { setBusy(false); }
  };
  return <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">fal Proxy</p>
        <p className="truncate text-sm font-medium text-base-fg/80">{session?.logged_in ? session.user?.display_name : "使用飞书账号连接"}</p>
        <p className="text-xs text-base-fg/60">费用由团队 fal 账户结算</p>
      </div>
      <Button variant={session?.logged_in ? "destructive" : "secondary"} className="h-9 shrink-0 px-3" disabled={busy} onClick={connect}>
        {session?.logged_in ? "Disconnect" : challenge ? "重新打开授权页" : "继续使用飞书"}
      </Button>
    </div>
    {challenge && <p className="text-sm text-base-fg/80">请核对确认码 <strong>{challenge.confirmation_code}</strong></p>}
    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
  </div>;
}
