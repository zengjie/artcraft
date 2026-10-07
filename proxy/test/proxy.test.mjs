import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createProxy, loadConfig } from '../src/server.mjs';
import { Store } from '../src/store.mjs';
import { hash } from '../src/common.mjs';
import { buildInput } from '../src/models.mjs';

const SESSION = 'test-session';
const COOKIE = `session=${SESSION}`;
const REQUEST = { model: 'flux_1_schnell', prompt: 'A fox', image_batch_count: 2, idempotency_token: 'first', aspect_ratio: 'tall_nine_by_sixteen' };

test('OAuth browser binding, one-time callback, device confirmation, session verification and logout', async t => {
  const app = await fixture(t);
  const challenge = await (await app.post('/v1/login_challenges/create', {})).json();
  const approval = new URL(challenge.verification_url).hash.split('=')[1];
  const start = await app.post('/auth/feishu/start', { approval_token: approval });
  const browserCookie = start.headers.get('set-cookie').split(';')[0];
  const authorization = new URL((await start.json()).url);
  assert.equal(authorization.hostname, 'accounts.feishu.cn');
  assert.equal(authorization.searchParams.get('client_id'), 'cli_test');
  assert.ok(!authorization.href.includes('secret'));
  const callback = `/auth/feishu/callback?state=${authorization.searchParams.get('state')}&code=code`;
  assert.equal((await app.get(callback)).status, 400);
  assert.equal(app.calls.length, 0);
  const approved = await app.get(callback, browserCookie);
  assert.equal(approved.status, 200);
  assert.equal(approved.headers.get('referrer-policy'), 'strict-origin');
  const page = await approved.text();
  assert.ok(page.includes('Test User'));
  assert.ok(page.includes(challenge.confirmation_code.slice(0, 4)));
  const confirmation = page.match(/name="confirmation" value="([^"]+)"/)[1];
  assert.equal((await app.get(callback, browserCookie)).status, 400);
  assert.equal((await (await app.post('/v1/login_challenges/poll', { device_token: challenge.device_token })).json()).status, 'pending');
  const confirmed = await fetch(`${app.base}/auth/feishu/confirm`, { method: 'POST', headers: { cookie: browserCookie, 'Content-Type': 'application/x-www-form-urlencoded', origin: app.config.origin }, body: new URLSearchParams({ confirmation }) });
  assert.equal(confirmed.status, 200);
  const poll = await app.post('/v1/login_challenges/poll', { device_token: challenge.device_token });
  const result = await poll.json();
  assert.equal(result.status, 'redeemed');
  const cookie = poll.headers.get('set-cookie').split(';')[0];
  assert.equal(cookie, `session=${result.maybe_signed_session}`);
  const session = await (await app.get('/v1/session', cookie)).json();
  assert.equal(session.logged_in, true);
  assert.equal(session.user.display_name, 'Test User');
  assert.equal(session.user.can_ban_users, false);
  assert.deepEqual(await (await app.get('/v1/billing/active_subscriptions', cookie)).json(), { success: true, active_subscriptions: [], maybe_loyalty_program: null });
  assert.equal((await app.post('/v1/logout', {}, cookie)).status, 200);
  assert.equal((await (await app.get('/v1/session', cookie)).json()).logged_in, false);
});

test('OAuth rejects a disallowed tenant', async t => {
  const app = await fixture(t, { allowedTenants: ['another-tenant'] });
  const c = await (await app.post('/v1/login_challenges/create', {})).json();
  const start = await app.post('/auth/feishu/start', { approval_token: new URL(c.verification_url).hash.split('=')[1] });
  const cookie = start.headers.get('set-cookie').split(';')[0];
  const state = new URL((await start.json()).url).searchParams.get('state');
  assert.equal((await app.get(`/auth/feishu/callback?state=${state}&code=code`, cookie)).status, 403);
});

test('login required; server key only; idempotency; queue completion; gallery and batch outputs', async t => {
  const app = await fixture(t);
  assert.equal((await app.post('/v1/omni_gen/generate/image', REQUEST)).status, 401);
  const r = await app.post('/v1/omni_gen/generate/image', REQUEST, COOKIE);
  assert.equal(r.status, 200);
  const job = await r.json();
  assert.equal(app.calls[0].options.headers.Authorization, 'Key fal-secret');
  assert.equal(JSON.parse(app.calls[0].options.body).image_size, 'portrait_16_9');
  const duplicate = await (await app.post('/v1/omni_gen/generate/image', REQUEST, COOKIE)).json();
  assert.equal(duplicate.inference_job_token, job.inference_job_token);
  assert.equal(app.calls.length, 1);
  assert.equal((await app.post('/v1/omni_gen/generate/image', { ...REQUEST, prompt: 'changed' }, COOKIE)).status, 409);
  const jobs = await (await app.get('/v1/jobs/session', COOKIE)).json();
  assert.equal(jobs.jobs[0].status.status, 'complete_success');
  const batch = jobs.jobs[0].maybe_result.maybe_batch_token;
  const outputs = await (await app.get(`/v1/media_files/batch_gen_redux/${batch}`, COOKIE)).json();
  assert.equal(outputs.media_files.length, 2);
  assert.ok(outputs.media_files.every(m => m.media_links.cdn_url.startsWith('https://v3.fal.media/')));
  assert.equal((await app.get(`/v1/media_files/file/${outputs.media_files[0].token}`)).status, 200);
  assert.ok(!JSON.stringify(jobs).includes('fal-secret'));
});

test('uploads resolve to data URIs and other users cannot generate with them', async t => {
  const app = await fixture(t);
  const form = new FormData();
  form.set('file', new Blob([Buffer.from([137, 80, 78, 71])], { type: 'image/png' }), 'input.png');
  const r = await fetch(`${app.base}/v1/media_files/upload/image`, { method: 'POST', headers: { cookie: COOKIE }, body: form });
  assert.equal(r.status, 200);
  const { media_file_token: id } = await r.json();
  const request = { model: 'nano_banana', prompt: 'Make it blue', image_media_tokens: [id], idempotency_token: 'edit' };
  assert.equal((await app.post('/v1/omni_gen/generate/image', request, COOKIE)).status, 200);
  assert.ok(app.calls[0].url.endsWith('/nano-banana/edit'));
  assert.match(JSON.parse(app.calls[0].options.body).image_urls[0], /^data:image\/png;base64,/);
  app.store.put('session', hash('other'), { user: { user_token: 'other' }, expires: Date.now() + 60_000 });
  assert.equal((await app.post('/v1/omni_gen/generate/image', request, 'session=other')).status, 404);
});

test('queue URL validation prevents key exfiltration; uncertain submission cannot be repeated', async t => {
  const app = await fixture(t, {}, async () => new Response(JSON.stringify({ request_id: 'r', status_url: 'https://attacker.example/status', response_url: 'https://attacker.example/result' })));
  assert.equal((await app.post('/v1/omni_gen/generate/image', REQUEST, COOKIE)).status, 502);
  assert.equal((await app.post('/v1/omni_gen/generate/image', REQUEST, COOKIE)).status, 409);
  assert.equal(app.calls.length, 1);
});

test('completed upstream errors become failed jobs', async t => {
  const app = await fixture(t, {}, async url => new Response(JSON.stringify(url.endsWith('/status') ? { status: 'COMPLETED', error: 'rejected' } : queueResponse())));
  await app.post('/v1/omni_gen/generate/image', REQUEST, COOKIE);
  const jobs = await (await app.get('/v1/jobs/session', COOKIE)).json();
  assert.equal(jobs.jobs[0].status.status, 'complete_failure');
});

test('CORS allows native Rust origin and rejects unrelated websites', async t => {
  const app = await fixture(t);
  assert.equal((await fetch(`${app.base}/v1/omni_gen/models/image`, { headers: { origin: 'https://attacker.example' } })).status, 403);
  assert.equal((await fetch(`${app.base}/auth/feishu/confirm`, { method: 'POST', headers: { origin: 'null' } })).status, 403);
  const r = await fetch(`${app.base}/v1/omni_gen/models/image`, { headers: { origin: 'https://desktop.getartcraft.com' } });
  assert.equal(r.status, 200);
  assert.deepEqual((await r.json()).providers.map(p => p.provider), ['artcraft']);
});

test('video, mesh, audio adapters and unsupported model rejection', () => {
  const resolve = id => `https://v3.fal.media/${id}.png`;
  const video = buildInput('video', { model: 'kling_2p5_turbo_pro', prompt: 'move', start_frame_image_media_token: 'start', end_frame_image_media_token: 'end', duration_seconds: 10 }, resolve);
  assert.equal(video.endpoint, 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video');
  assert.equal(video.input.tail_image_url, 'https://v3.fal.media/end.png');
  assert.equal(video.input.duration, '10');
  assert.throws(() => buildInput('video', { model: video.model.model, prompt: 'move', duration_seconds: 7 }, resolve));
  const mesh = buildInput('mesh', { model: 'hunyuan_3d_2p1', reference_image_media_tokens: ['source'], enable_texture: true }, resolve);
  assert.equal(mesh.input.textured_mesh, true);
  assert.equal(buildInput('audio', { model: 'stable_audio', prompt: 'waves' }, resolve).endpoint, 'fal-ai/stable-audio');
  assert.throws(() => buildInput('image', { model: 'https://attacker.example' }, resolve));
});

test('SQLite jobs persist after restart', t => {
  const dir = mkdtempSync(join(tmpdir(), 'artcraft-store-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const file = join(dir, 'db.sqlite');
  const first = new Store(file);
  first.put('job', 'job_1', { owner: 'u', state: 'pending' });
  first.close();
  const second = new Store(file);
  assert.equal(second.get('job', 'job_1').state, 'pending');
  second.close();
});

function queueResponse() {
  return { request_id: 'r1', status_url: 'https://queue.fal.run/fal-ai/test/requests/r1/status', response_url: 'https://queue.fal.run/fal-ai/test/requests/r1' };
}
async function fixture(t, overrides = {}, customFetch) {
  const dir = mkdtempSync(join(tmpdir(), 'artcraft-proxy-'));
  const config = { ...loadConfig({ DATA_DIR: dir, FEISHU_APP_ID: 'cli_test', FEISHU_APP_SECRET: 'app-secret', FAL_KEY: 'fal-secret' }), ...overrides };
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    if (customFetch) return customFetch(url, options);
    const data = url.includes('/oauth/token') ? { code: 0, access_token: 'feishu-secret' }
      : url.includes('/user_info') ? { code: 0, data: { open_id: 'ou_test', tenant_key: 'tenant_test', name: 'Test User' } }
      : options.method === 'POST' ? queueResponse()
      : url.endsWith('/status') ? { status: 'COMPLETED' }
      : { images: [{ url: 'https://v3.fal.media/first.png' }, { url: 'https://v3.fal.media/second.png' }] };
    return new Response(JSON.stringify(data));
  };
  const app = createProxy(config, { fetchImpl });
  app.store.put('session', hash(SESSION), { user: { user_token: 'user_test', username: 'tester' }, expires: Date.now() + 60_000 });
  app.server.listen(0, '127.0.0.1');
  await once(app.server, 'listening');
  const base = `http://127.0.0.1:${app.server.address().port}`;
  t.after(async () => { app.server.closeAllConnections(); await new Promise(resolve => app.server.close(resolve)); app.store.close(); rmSync(dir, { recursive: true, force: true }); });
  return { ...app, config, calls, base,
    get: (path, cookie) => fetch(base + path, { headers: cookie ? { cookie } : {} }),
    post: (path, data, cookie) => fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(cookie ? { cookie } : {}) }, body: JSON.stringify(data) }),
  };
}
