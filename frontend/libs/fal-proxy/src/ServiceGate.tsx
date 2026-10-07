import { useEffect } from "react";
import { Modal } from "@storyteller/ui-modal";
import { Button } from "@storyteller/ui-button";
import { useLoginModalStore } from "@storyteller/ui-login-modal";
import { FalProxyAccountBlock } from "./AccountBlock";
import { activeServiceMode, enabled, extensionAvailable, useProxySession, useServiceMode, type ServiceMode } from "./provider";

const OPTIONS = [
  {
    mode: "artcraft" as const,
    title: "ArtCraft",
    lines: ["Your ArtCraft account and credits.", "Every official model, plan and upgrade, exactly as upstream ships it."],
    action: "Use ArtCraft",
  },
  {
    mode: "fal" as const,
    title: "FAL",
    lines: ["The FAL account, signed in with Feishu.", "FAL-hosted models at list price. ArtCraft credits are never used."],
    action: "Use FAL",
  },
];

/**
 * First-launch choice between the two generation services, and the Feishu
 * sign-in gate while the app runs on the team fal account. One service is
 * active at a time; the other one's models and accounts stay out of view.
 */
export function ServiceGate() {
  const mode = useServiceMode((s) => s.mode);
  const chooseMode = useServiceMode((s) => s.choose);
  const choose = (mode: ServiceMode) => {
    chooseMode(mode);
    // No reload happens when the choice matches the running service; resume
    // the upstream login flow that was held back behind this gate.
    if (mode === activeServiceMode) useLoginModalStore.getState().triggerRecheck();
  };
  const session = useProxySession((s) => s.session);
  const refresh = useProxySession((s) => s.refresh);
  useEffect(() => { if (enabled) void refresh(); }, [refresh]);
  if (!extensionAvailable) return null;
  const needsChoice = mode === undefined;
  const needsFeishu = enabled && session !== undefined && !session.logged_in;
  if (!needsChoice && !needsFeishu) return null;
  return (
    <Modal
      isOpen
      onClose={() => undefined}
      showClose={false}
      closeOnOutsideClick={false}
      closeOnEsc={false}
      className="max-w-2xl rounded-none border border-ui-panel-border bg-ui-panel p-8 shadow-none"
    >
      {needsChoice ? (
        <div className="text-base-fg">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-base-fg/60">Generation service</p>
          <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight">Where should your generations run?</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-base-fg/60">
            Pick one. The app shows only that service's models and account. You can switch later in Settings, under Accounts.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {OPTIONS.map((option) => (
              <div key={option.mode} className="flex flex-col gap-3 border border-ui-panel-border bg-ui-sunken p-5">
                <h3 className="font-display text-xl tracking-tight">{option.title}</h3>
                <ul className="flex flex-col gap-1 text-sm leading-relaxed text-base-fg/60">
                  {option.lines.map((line) => <li key={line}>{line}</li>)}
                </ul>
                <Button variant="primary" className="mt-auto" onClick={() => choose(option.mode)}>
                  {option.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 text-base-fg">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-base-fg/60">Generation service</p>
            <h2 className="mt-2 font-display text-3xl leading-tight tracking-tight">Connect the FAL account</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-base-fg/60">
              This app runs on FAL. Sign in with Feishu to generate, or go back to ArtCraft's own service.
            </p>
          </div>
          <div className="border border-ui-panel-border bg-ui-sunken p-5">
            <FalProxyAccountBlock />
          </div>
          <button
            type="button"
            onClick={() => choose("artcraft")}
            className="self-start text-sm text-base-fg/55 underline-offset-2 hover:text-base-fg/90 hover:underline"
          >
            Use ArtCraft instead
          </button>
        </div>
      )}
    </Modal>
  );
}
