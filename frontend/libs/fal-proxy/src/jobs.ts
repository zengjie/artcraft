import { proxyCall } from "./provider";

export interface ProxyJobView {
  job_token: string;
  status: { status: string; maybe_failure_message?: string | null };
  maybe_result?: { entity_token?: string | null; maybe_batch_token?: string | null; text?: string | null } | null;
  [key: string]: unknown;
}

export interface RunProxyJobOptions {
  signal?: AbortSignal;
  /** Called whenever the job status changes while polling. */
  onStatus?: (status: string) => void;
  pollMs?: number;
}

const sleep = (ms: number, signal?: AbortSignal) => new Promise<void>((resolve, reject) => {
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); }, { once: true });
});

/**
 * Submit a Proxy job for a modality the desktop task queue does not model
 * (world bundles, prompt text) and wait for it. The native layer still owns
 * the credentials; this only chooses whitelisted operations.
 */
export async function runProxyJob(
  modality: "world" | "text",
  body: Record<string, unknown>,
  { signal, onStatus, pollMs = 3000 }: RunProxyJobOptions = {},
): Promise<ProxyJobView> {
  const submitted = await proxyCall<{ inference_job_token: string }>("generate", {
    modality,
    body: { idempotency_token: crypto.randomUUID(), ...body },
  });
  const token = submitted.inference_job_token;
  let last = "";
  for (;;) {
    await sleep(pollMs, signal);
    const response = await proxyCall<{ job?: ProxyJobView }>("read", { path: `/v1/jobs/job/${token}` });
    if (!response?.job) throw new Error("The Proxy no longer lists this job");
    const status = response.job.status?.status ?? "";
    if (status !== last) { last = status; onStatus?.(status); }
    if (status === "complete_success") return response.job;
    if (status === "complete_failure") throw new Error(response.job.status?.maybe_failure_message || "fal could not complete this generation");
  }
}

/** Resolve a Proxy media token to its downloadable URL. */
export async function proxyMediaUrl(token: string): Promise<string> {
  const response = await proxyCall<{ media_file?: { media_links?: { cdn_url?: string } } }>("read", { path: `/v1/media_files/file/${token}` });
  const url = response.media_file?.media_links?.cdn_url;
  if (!url) throw new Error("The Proxy returned no file for this result");
  return url;
}
