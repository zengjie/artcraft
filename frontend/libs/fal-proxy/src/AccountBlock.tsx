import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@storyteller/ui-button";
import { enabled, proxyCall, useProxySession } from "./provider";

interface Challenge { device_token: string; verification_url: string; confirmation_code: string; expires_at: string }

/**
 * Settings and login-modal block for the team fal account. Mirrors the
 * ArtCraft, Grok and Midjourney blocks: mono label, status line, one button.
 */
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
      if (Date.now() >= Date.parse(challenge.expires_at)) { setChallenge(undefined); setError("The Feishu sign-in request expired. Start again."); return; }
      try {
        const result = await proxyCall<{ status: string }>("poll_login", { body: { device_token: challenge.device_token } });
        if (!active) return;
        if (result.status === "redeemed") { await refresh(); setChallenge(undefined); return; }
        if (result.status === "failed") { setChallenge(undefined); setError("Feishu did not confirm this device. Start again."); return; }
      } catch (error) { if (active) setError(String(error)); }
      if (active) timer = window.setTimeout(poll, 3000);
    };
    timer = window.setTimeout(poll, 1000);
    return () => { active = false; clearTimeout(timer); };
  }, [challenge, refresh]);
  if (!enabled) return null;
  const loggedIn = session?.logged_in === true;
  const connect = async () => {
    setBusy(true); setError("");
    try {
      if (loggedIn) { await proxyCall("logout"); await refresh(); }
      else {
        const next = challenge ?? await proxyCall<Challenge>("login");
        setChallenge(next);
        await invoke("plugin:opener|open_url", { url: next.verification_url });
      }
    } catch (error) { setError(String(error)); }
    finally { setBusy(false); }
  };
  const code = challenge ? `${challenge.confirmation_code.slice(0, 4)} ${challenge.confirmation_code.slice(4)}`.trim() : "";
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">FAL account</p>
          <p className="truncate text-sm font-medium text-base-fg/80">
            {loggedIn ? session?.user?.display_name : "Not connected"}
          </p>
          <p className="text-xs leading-relaxed text-base-fg/55">
            {loggedIn
              ? "Signed in with Feishu. Generations run on the FAL account and never use ArtCraft credits."
              : "Sign in with Feishu to generate on FAL at list price."}
          </p>
        </div>
        <Button
          variant={loggedIn ? "destructive" : "secondary"}
          className="h-9 shrink-0 px-3"
          disabled={busy}
          onClick={connect}
        >
          {busy ? <LoaderCircleIcon className="animate-spin text-sm" /> : loggedIn ? "Disconnect" : challenge ? "Reopen Feishu" : "Connect with Feishu"}
        </Button>
      </div>
      {challenge && (
        <div className="flex items-center justify-between gap-3 border border-ui-panel-border bg-ui-sunken px-3 py-2">
          <span className="text-xs text-base-fg/60">Approve this device in Feishu when it shows this code</span>
          <span className="font-mono text-sm font-semibold tabular-nums tracking-[0.2em] text-base-fg">{code}</span>
        </div>
      )}
      {error && <p role="alert" className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
