import { useEffect, useRef, useState } from "react";
import { LoaderCircleIcon, PenLineIcon } from "lucide-react";
import { Tooltip } from "@storyteller/ui-tooltip";
import { twMerge } from "tailwind-merge";
import { enabled, useProxySession } from "./provider";
import { runProxyJob } from "./jobs";
import { useProxyModel } from "./catalog";
import { formatUsd } from "./pricing";

interface PromptDraftButtonProps {
  /** The short idea the person typed; becomes the generator's concept. */
  concept: string;
  /** Optional reference image token the generator should describe. */
  imageToken?: string | null;
  /** Receives the finished prompt; the caller decides how to place it. */
  onDraft: (prompt: string) => void;
  className?: string;
}

/**
 * Expands a few words into a full video prompt with fal's prompt generator.
 * Shown only while the team fal account is connected. Replacing the text is a
 * visible, reversible action: the previous text is restored by Undo.
 */
export function PromptDraftButton({ concept, imageToken, onDraft, className }: PromptDraftButtonProps) {
  const loggedIn = useProxySession((s) => s.session?.logged_in === true);
  const cap = useProxyModel("video_prompt");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [previous, setPrevious] = useState<string>();
  const abort = useRef<AbortController>();
  useEffect(() => () => abort.current?.abort(), []);
  if (!enabled || !loggedIn || !cap) return null;
  const trimmed = concept.trim();
  const ready = trimmed.length >= 3 && !busy;
  const price = cap.price ? formatUsd(cap.price.usd) : undefined;
  const draft = async () => {
    if (!ready) return;
    setBusy(true); setError("");
    abort.current = new AbortController();
    try {
      const body: Record<string, unknown> = { model: "video_prompt", prompt: trimmed };
      if (imageToken) body.image_media_tokens = [imageToken];
      const job = await runProxyJob("text", body, { signal: abort.current.signal });
      const text = job.maybe_result?.text?.trim();
      if (!text) throw new Error("fal returned an empty prompt");
      setPrevious(concept);
      onDraft(text);
    } catch (error) {
      if ((error as Error).name !== "AbortError") setError((error as Error).message || String(error));
    } finally { setBusy(false); }
  };
  const undo = () => { if (previous !== undefined) { onDraft(previous); setPrevious(undefined); } };
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {previous !== undefined && !busy && (
        <button type="button" onClick={undo} className="text-[11px] text-base-fg/55 underline-offset-2 hover:text-base-fg/90 hover:underline">
          Undo draft
        </button>
      )}
      {error && <span role="alert" className="max-w-[260px] truncate text-[11px] text-red-400" title={error}>{error}</span>}
      <Tooltip
        position="top"
        className="z-50"
        content={
          <div className="flex max-w-[240px] flex-col gap-1 text-left font-sans normal-case tracking-normal">
            <span className="text-sm font-medium text-base-fg">Draft a full prompt from your idea</span>
            <span className="text-xs text-base-fg/70">FAL's video prompt generator expands a short concept into a shot description you can edit.{price ? ` About ${price} per draft.` : ""}</span>
          </div>
        }
      >
        <button
          type="button"
          onClick={draft}
          disabled={!ready}
          aria-label="Draft a full prompt with FAL"
          className="flex h-7 items-center gap-1.5 border border-ui-controls-border bg-ui-controls px-2.5 text-xs font-medium text-base-fg/80 transition-colors hover:bg-ui-controls/70 hover:text-base-fg disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <LoaderCircleIcon className="h-3.5 w-3.5 animate-spin" /> : <PenLineIcon className="h-3.5 w-3.5" />}
          {busy ? "Drafting" : "Draft prompt"}
        </button>
      </Tooltip>
    </div>
  );
}
