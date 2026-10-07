import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Store } from './store.mjs';
import { Auth } from './auth.mjs';
import { Media } from './media.mjs';
import { Generation } from './generation.mjs';
import { listing } from './models.mjs';
import { fail, json, jsonBody } from './common.mjs';

export function loadConfig(env = process.env) {
  const origin = new URL(env.PROXY_PUBLIC_URL || 'http://localhost:12345');
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname);
  if ((origin.protocol !== 'https:' && !(origin.protocol === 'http:' && loopback)) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('PROXY_PUBLIC_URL must be an HTTPS origin (HTTP allowed on loopback)');
  return {
    origin: origin.origin, port: Number(env.PORT || 12345), host: env.HOST || '127.0.0.1',
    dataDir: resolve(env.DATA_DIR || 'data'), falKey: env.FAL_KEY || '',
    feishuAppId: env.FEISHU_APP_ID || '', feishuAppSecret: env.FEISHU_APP_SECRET || '',
    allowedTenants: (env.FEISHU_ALLOWED_TENANTS || '').split(',').map(s => s.trim()).filter(Boolean),
    allowedOrigins: (env.ALLOWED_ORIGINS || 'tauri://localhost,https://tauri.localhost,http://tauri.localhost,http://localhost:5173,https://artcraft.localhost,https://desktop.getartcraft.com,http://localhost').split(','),
    maxActiveJobs: Number(env.MAX_ACTIVE_JOBS_PER_USER || 5),
  };
}

export function createProxy(config, { store = new Store(join(config.dataDir, 'proxy.sqlite')), fetchImpl = fetch } = {}) {
  const auth = new Auth(store, config, fetchImpl);
  const media = new Media(store, config);
  const generation = new Generation(store, media, config, fetchImpl);
  const rate = new Map();
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    try {
      const origin = req.headers.origin;
      if (origin && origin !== config.origin && !config.allowedOrigins.includes(origin)) fail(403, 'Origin not allowed');
      if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      if (req.method === 'OPTIONS') {
        res.writeHead(204, { 'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'content-type,session' });
        return res.end();
      }
      const url = new URL(req.url, config.origin);
      const path = url.pathname;
      const bucket = `${req.socket.remoteAddress}:${path.startsWith('/auth') || path.startsWith('/login') || path.includes('login_challenges/create') ? 'auth' : 'api'}`;
      const now = Date.now();
      for (const [key, value] of rate) if (value.until < now) rate.delete(key);
      const limit = rate.get(bucket) || { count: 0, until: now + 60_000 };
      if (++limit.count > (bucket.endsWith(':auth') ? 30 : 600)) fail(429, 'Too many requests');
      rate.set(bucket, limit);
      if (path === '/healthz' && req.method === 'GET') return json(res, { ok: true });
      if (await auth.route(req, res, url)) return;
      if (req.method === 'GET' && /^\/v1\/omni_gen\/models\/(image|video|audio|mesh|splat)$/.test(path)) return json(res, listing(path.split('/').at(-1)));
      // Opaque media/asset tokens are capability URLs, matching the native
      // client's anonymous media-detail fetches. Lists remain session-scoped.
      if (req.method === 'GET' && /^\/assets\/[A-Za-z0-9_-]{43}$/.test(path)) {
        const id = path.split('/').at(-1), asset = store.get('asset', id);
        if (!asset) fail(404, 'Asset not found');
        res.setHeader('Content-Type', asset.contentType);
        res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
        const stream = createReadStream(join(config.dataDir, 'uploads', id));
        stream.on('error', () => res.destroy());
        return stream.pipe(res);
      }
      if (req.method === 'GET' && path.startsWith('/v1/media_files/file/')) {
        const record = store.get('media', path.split('/').at(-1));
        if (!record) fail(404, 'Media not found');
        return json(res, { success: true, media_file: record.item });
      }
      const session = auth.require(req);
      const owner = session.user.user_token;
      if (req.method === 'POST' && /^\/v1\/omni_gen\/generate\/(image|video|audio|mesh|splat)$/.test(path)) {
        return json(res, await generation.submit(owner, path.split('/').at(-1), await jsonBody(req)));
      }
      if (req.method === 'POST' && path.startsWith('/v1/omni_gen/cost/')) {
        await jsonBody(req);
        // Billing belongs to fal. Unknown prices must never be displayed as free.
        return json(res, { success: true, cost_in_credits: null, cost_in_usd_cents: null, has_watermark: false, is_free: false, is_rate_limited: false, is_unlimited: false });
      }
      if (req.method === 'POST' && path === '/v1/generate/image/remove_background') {
        return json(res, await generation.submit(owner, 'image', { ...await jsonBody(req), model: 'fal_birefnet' }));
      }
      if (req.method === 'POST' && path === '/v1/generate/image/inpaint/flux_pro_1') {
        const request = await jsonBody(req);
        return json(res, await generation.submit(owner, 'image', { ...request, model: 'flux_pro_1', image_batch_count: { one: 1, two: 2, three: 3, four: 4 }[request.num_images] || 1 }));
      }
      if (req.method === 'GET' && path === '/v1/jobs/session') {
        let jobs = await generation.list(owner);
        if (url.searchParams.has('include_states')) jobs = jobs.filter(j => url.searchParams.get('include_states').split(',').includes(j.status.status));
        if (url.searchParams.has('exclude_states')) jobs = jobs.filter(j => !url.searchParams.get('exclude_states').split(',').includes(j.status.status));
        return json(res, { success: true, jobs });
      }
      if (req.method === 'GET' && path.startsWith('/v1/jobs/job/')) {
        const id = path.split('/').at(-1);
        if (store.get('job', id)?.owner !== owner) fail(404, 'Job not found');
        await generation.poll(id);
        return json(res, { success: true, state: generation.view(id), job: generation.view(id) });
      }
      if (req.method === 'POST' && /^\/v1\/media_files\/upload\/(image|audio|new_video|new_engine_asset)$/.test(path)) return json(res, await media.upload(req, owner));
      if (req.method === 'DELETE' && path.startsWith('/v1/media_files/file/')) {
        const id = path.split('/').at(-1);
        if (store.get('media', id)?.owner !== owner) fail(404, 'Media not found');
        store.remove('media', id);
        return json(res, { success: true });
      }
      if (req.method === 'POST' && path.startsWith('/v1/media_files/rename/')) {
        const id = path.split('/').at(-1), record = store.get('media', id);
        if (record?.owner !== owner) fail(404, 'Media not found');
        const input = await jsonBody(req);
        record.item.maybe_title = String(input.title || input.maybe_title || '').slice(0, 200);
        store.put('media', id, record);
        return json(res, { success: true });
      }
      if (req.method === 'GET' && path.startsWith('/v1/media_files/')) {
        let items = store.list('media').filter(m => m.owner === owner).map(m => m.item);
        const batch = path.match(/^\/v1\/media_files\/(?:batch|batch_gen_redux)\/(.+)$/);
        if (batch) items = items.filter(m => m.maybe_batch_token === batch[1]);
        else if (path === '/v1/media_files/batch') {
          const ids = url.searchParams.getAll('tokens').flatMap(x => x.split(','));
          items = items.filter(m => ids.includes(m.token));
        } else if (path.includes('featured')) items = [];
        else if (!/^\/v1\/media_files\/(list|search_session|mesh\/list|splat\/list|list\/user\/[^/]+)$/.test(path)) fail(404, 'Unsupported media operation');
        const kind = path.includes('/mesh/') ? 'mesh' : path.includes('/splat/') ? 'splat' : url.searchParams.get('media_class') || url.searchParams.get('filter_media_class');
        if (kind) items = items.filter(m => m.media_class === kind);
        const page = Math.max(0, Number(url.searchParams.get('page_index')) || 0), size = Math.min(100, Math.max(1, Number(url.searchParams.get('page_size')) || 50));
        const results = items.slice(page * size, (page + 1) * size);
        return json(res, { success: true, results, media_files: results, pagination: { current_page: page, total_page_count: Math.ceil(items.length / size), page_size: size, total_count: items.length, has_next_page: (page + 1) * size < items.length } });
      }
      if (req.method === 'GET' && path === '/v1/billing/active_subscriptions') return json(res, { success: true, active_subscriptions: [], maybe_loyalty_program: null });
      if (req.method === 'GET' && path === '/v1/credits/namespace/artcraft') return json(res, { success: true, free_credits: 0, monthly_credits: 0, banked_credits: 0, sum_total_credits: 0, billing_provider: 'fal' });
      fail(404, 'This operation is not supported by the fal Proxy');
    } catch (error) {
      if (res.headersSent) return res.destroy();
      const status = error.status || 500;
      json(res, { success: false, error_code: status, message: error.status ? error.message : 'Proxy request failed', error_message: error.status ? error.message : 'Proxy request failed' }, status);
    }
  });
  server.requestTimeout = 60_000;
  // Expiring auth records do not accumulate indefinitely. Session tokens are
  // hashed; redeemed challenge credentials are deleted after ten minutes.
  const cleanup = setInterval(() => {
    for (const kind of ['challenge', 'approval', 'oauth', 'confirmation', 'session']) {
      for (const record of store.list(kind)) if (record.expires < Date.now()) store.remove(kind, record.id);
    }
  }, 60_000).unref();
  server.on('close', () => clearInterval(cleanup));
  return { server, store, auth, generation, media };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const config = loadConfig();
  const { server, store } = createProxy(config);
  server.listen(config.port, config.host, () => console.info(`ArtCraft fal Proxy listening at ${config.origin}`));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { store.close(); process.exit(0); }));
}
