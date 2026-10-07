import { registerApiExtension } from "@storyteller/api";
import { enabled, proxyCall, useProxySession } from "./provider";

const tokens = new Set<string>();
let uploadProvider: string | undefined;
export const getUploadProvider = () => uploadProvider;
export const setUploadProvider = (provider?: string) => { uploadProvider = provider; };
const remember = (data: any): any => {
  for (const item of data?.results ?? data?.media_files ?? []) {
    item.origin_category ??= item.is_user_upload ? "upload" : "inference";
    tokens.add(item.token);
    if (item.maybe_batch_token) tokens.add(item.maybe_batch_token);
  }
  for (const job of data?.jobs ?? []) {
    tokens.add(job.job_token);
    if (job.maybe_result?.entity_token) tokens.add(job.maybe_result.entity_token);
    if (job.maybe_result?.maybe_batch_token) tokens.add(job.maybe_result.maybe_batch_token);
  }
  if (data?.media_file_token) tokens.add(data.media_file_token);
  return data;
};
const read = async (path: string) => remember(await proxyCall("read", { path }));
let ready: Promise<unknown> = Promise.resolve();

export function installProxyApi() {
  if (!enabled) return;
  let owner: string | undefined;
  let officialUsername: string | undefined;
  useProxySession.subscribe(({ session }) => {
    const next = session?.logged_in ? session.user?.user_token : undefined;
    if (next === owner) return;
    owner = next; tokens.clear();
    ready = next ? Promise.all([read("/v1/media_files/list?page_size=100"), read("/v1/jobs/session")]).catch(() => {}) : Promise.resolve();
  });
  registerApiExtension(async ({ url, method, body }, original) => {
    const p = url.pathname;
    if (method === "GET" && p === "/v1/session") {
      const result = await original();
      officialUsername = result?.user?.username;
      return result;
    }
    // Official session, balance, subscription, upgrades and public browsing
    // never enter this adapter.
    if (method === "GET" && p === "/v1/omni_gen/models/audio") {
      const a = await original().catch(() => ({ models: [], providers: [] }));
      const catalog = await proxyCall<{ models: any[] }>("capabilities");
      const audio = catalog.models.filter(m => m.modality === "audio");
      return { ...a, success: true, models: [...audio, ...(a.models ?? [])], providers: [...(a.providers ?? []), { provider: "fal_proxy", models: audio.map(m => ({ model: m.model })) }] };
    }
    const session = useProxySession.getState().session;
    if (!session?.logged_in) return original();
    if (method === "POST" && (/^\/v1\/media_files\/upload\/(image|audio|new_video|new_engine_asset)$/.test(p) || p === "/v1/image_studio/scene_snapshot") && uploadProvider === "fal_proxy" && body instanceof FormData) {
      const file = body.get("file") ?? body.get("video") ?? body.get("snapshot");
      if (!(file instanceof Blob)) throw new Error("Missing upload file");
      const result = remember(await proxyCall("upload", { bytes: Array.from(new Uint8Array(await file.arrayBuffer())), mime: file.type }));
      return p === "/v1/image_studio/scene_snapshot" ? { ...result, snapshot_media_token: result.media_file_token } : result;
    }
    await ready;
    const token = p.split("/").at(-1)!;
    if (tokens.has(token) || token.startsWith("mf_fpx_")) {
      if (method === "GET") return read(p + url.search);
      if (method === "DELETE" && p.startsWith("/v1/media_files/file/")) return proxyCall("delete_media", { token });
      if (method === "POST" && p.startsWith("/v1/media_files/rename/")) return proxyCall("rename_media", { token, body });
      throw new Error("This fal asset does not support that action yet");
    }
    if (method === "GET" && p === "/v1/media_files/batch") {
      const all = url.searchParams.getAll("tokens").flatMap(t => t.split(","));
      const proxyTokens = all.filter(t => tokens.has(t) || t.startsWith("mf_fpx_"));
      if (proxyTokens.length === all.length && all.length) return read(p + url.search);
      // Mixed batches are resolved per source; no Proxy token reaches official API.
      if (proxyTokens.length) {
        const official = all.filter(t => !proxyTokens.includes(t));
        const { MediaFilesApi } = await import("@storyteller/api");
        const [a, b] = await Promise.all([new MediaFilesApi().ListMediaFilesByTokens({ mediaTokens: official }), read(`${p}?${new URLSearchParams(proxyTokens.map(t => ["tokens", t]))}`)]);
        return { success: true, media_files: [...(a.data ?? []), ...(b.media_files ?? [])] };
      }
    }
    const ownLibrary = p === `/v1/media_files/list/user/${session.user?.username}`;
    if (p.startsWith("/v1/media_files/list/user/") && !ownLibrary && p !== `/v1/media_files/list/user/${officialUsername}`) return original();
    const mergedList = method === "GET" && (p === "/v1/jobs/session" || /^\/v1\/media_files\/(list|search_session|mesh\/list|splat\/list)$/.test(p) || /^\/v1\/media_files\/list\/user\//.test(p));
    if (!mergedList) return original();
    const [official, proxy] = await Promise.allSettled([ownLibrary ? Promise.resolve({ success: true }) : original(), read(p + url.search)]);
    if (proxy.status === "rejected") {
      if (official.status === "fulfilled" && !ownLibrary) return official.value;
      throw proxy.reason;
    }
    const a = official.status === "fulfilled" ? official.value : {};
    const b = proxy.value;
    const result = { ...a, ...b, success: true };
    for (const key of ["results", "media_files", "jobs"]) {
      if (!Array.isArray(a[key]) && !Array.isArray(b[key])) continue;
      result[key] = [...(a[key] ?? []), ...(b[key] ?? [])].sort((x, y) => String(y.created_at).localeCompare(String(x.created_at)));
    }
    result.pagination = { ...b.pagination, has_next_page: Boolean(a.pagination?.has_next_page || b.pagination?.has_next_page) };
    return result;
  });
  void useProxySession.getState().refresh();
}
