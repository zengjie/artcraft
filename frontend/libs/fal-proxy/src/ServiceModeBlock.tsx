import { useState } from "react";
import { Button } from "@storyteller/ui-button";
import { activeServiceMode, extensionAvailable, useServiceMode } from "./provider";

const LABEL = { artcraft: "ArtCraft", fal: "FAL" } as const;
const SUMMARY = {
  artcraft: "Official ArtCraft models, account and credits.",
  fal: "FAL-hosted models billed to the FAL account.",
} as const;

/** Settings row that names the active generation service and switches to the other one. */
export function ServiceModeBlock() {
  const choose = useServiceMode((s) => s.choose);
  const [confirming, setConfirming] = useState(false);
  if (!extensionAvailable) return null;
  const other = activeServiceMode === "fal" ? "artcraft" : "fal";
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em]">Generation service</p>
          <p className="truncate text-sm font-medium text-base-fg/80">{LABEL[activeServiceMode]}</p>
          <p className="text-xs leading-relaxed text-base-fg/55">{SUMMARY[activeServiceMode]} Only one service is active at a time.</p>
        </div>
        {!confirming && (
          <Button variant="secondary" className="h-9 shrink-0 px-3" onClick={() => setConfirming(true)}>
            Switch to {LABEL[other]}
          </Button>
        )}
      </div>
      {confirming && (
        <div className="flex items-center justify-between gap-3 border border-ui-panel-border bg-ui-sunken px-3 py-2">
          <span className="text-xs text-base-fg/70">The app reloads and shows only {LABEL[other]} models and accounts.</span>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" className="h-8 px-3" onClick={() => setConfirming(false)}>Cancel</Button>
            <Button variant="primary" className="h-8 px-3" onClick={() => choose(other)}>Reload and switch</Button>
          </div>
        </div>
      )}
    </div>
  );
}
