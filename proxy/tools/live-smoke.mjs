// Explicit paid smoke runner. Invoke only with an approved budget and a real
// Feishu session; never creates identities or reads the server's fal key.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { deflateSync } from 'node:zlib';
const budget = Number(process.env.SMOKE_BUDGET_USD);
if (!(budget > 0 && budget <= 20)) throw new Error('Set the explicitly authorized SMOKE_BUDGET_USD (maximum 20)');
const sessionPath = process.env.PROXY_SESSION_FILE || join(homedir(), 'Artcraft/extensions/fal-proxy/session.json');
const credentials = JSON.parse(readFileSync(sessionPath, 'utf8'));
const origin = new URL(credentials.origin);
if (origin.protocol !== 'https:' && !(origin.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname))) throw new Error('Invalid Proxy origin');
const output = resolve(process.env.SMOKE_OUTPUT_DIR || '/tmp/artcraft-fal-live');
mkdirSync(output, { recursive: true, mode: 0o700 });
const ledgerPath = join(output, 'ledger.json');
const ledger = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, 'utf8')) : { origin: origin.origin, approvedBudget: budget, runs: {} };
if (ledger.origin !== origin.origin) throw new Error('Do not reuse a ledger across provider instances');
const save = () => writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2), { mode: 0o600 });
const call = async (path, body, form) => {
  const response = await fetch(new URL(path, origin), {
    method: body || form ? 'POST' : 'GET', redirect: 'error', signal: AbortSignal.timeout(60000),
    headers: { session: credentials.session, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    ...(body || form ? { body: form || JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${response.status}: ${data.error_message || 'Request failed'}`);
  return data;
};
const user = await call('/v1/session');
if (!user.logged_in) throw new Error('Complete Feishu login in the desktop first');
if (ledger.owner && ledger.owner !== user.user.user_token) throw new Error('Do not reuse a ledger across accounts');
ledger.owner = user.user.user_token; save();

async function run(name, modality, request, reserve) {
  let entry = ledger.runs[name];
  if (!entry) {
    const committed = Object.values(ledger.runs).reduce((sum, item) => sum + item.reservedUSD, 0);
    if (committed + reserve > budget) throw new Error('Smoke budget exhausted');
    entry = ledger.runs[name] = { idempotency: randomUUID(), reservedUSD: reserve, request, modality, status: 'prepared' }; save();
  }
  if (!entry.job) {
    entry.status = 'submitting'; save();
    const response = await call(`/v1/omni_gen/generate/${modality}`, { ...entry.request, idempotency_token: entry.idempotency });
    entry.job = response.inference_job_token; entry.status = 'pending'; save();
    console.log(`${name}: submitted`);
  }
  const deadline = Date.now() + 15 * 60_000;
  while (!['complete_success', 'complete_failure'].includes(entry.status)) {
    if (Date.now() > deadline) throw new Error(`${name}: polling timeout; job retained, do not create a replacement`);
    const response = await call(`/v1/jobs/job/${entry.job}`);
    entry.status = response.job.status.status;
    entry.output = response.job.maybe_result?.entity_token;
    entry.failure = response.job.status.maybe_failure_message;
    save();
    if (!entry.status.startsWith('complete_')) await new Promise(resolve => setTimeout(resolve, 5000));
  }
  console.log(`${name}: ${entry.status}${entry.failure ? ` (${entry.failure})` : ''}`);
  return entry.output;
}

const image = await run('flux-text', 'image', { model: 'flux_1_schnell', prompt: 'A small red wooden toy boat on a plain light grey background, studio product photograph', image_batch_count: 1 }, .02);
if (!image) throw new Error('Reference generation failed');
if (!ledger.mask) {
  const form = new FormData(); form.set('file', new Blob([maskPng(1024)], { type: 'image/png' }), 'mask.png');
  ledger.mask = (await call('/v1/media_files/upload/image', null, form)).media_file_token; save();
}
await run('nano-text', 'image', { model: 'nano_banana', prompt: 'A small wooden toy boat on a white background', image_batch_count: 1 }, .1);
await run('nano-edit', 'image', { model: 'nano_banana', prompt: 'Change the toy boat to blue. Preserve its shape.', image_media_tokens: [image], image_batch_count: 1 }, .1);
await run('angles', 'image', { model: 'qwen_edit_2511_angles', image_media_tokens: [image], horizontal_angle: 90, vertical_angle: 20, zoom: 5 }, .2);
await run('fill-mask', 'image', { model: 'flux_pro_1', prompt: 'a blue sail on the toy boat', image_media_tokens: [image], inpainting_mask_image_media_token: ledger.mask }, .2);
await run('kling-text', 'video', { model: 'kling_2p5_turbo_pro', prompt: 'A red wooden toy boat gently floating on calm water, fixed camera', duration_seconds: 5 }, .4);
await run('kling-image', 'video', { model: 'kling_2p5_turbo_pro', prompt: 'Slow gentle camera orbit around the toy boat', start_frame_image_media_token: image, duration_seconds: 5 }, .4);
await run('mesh-image', 'mesh', { model: 'hunyuan_3d_2p1', image_media_tokens: [image], enable_texture: true }, 2);
await run('mesh-text', 'mesh', { model: 'hunyuan_3d_v3_text', prompt: 'A simple wooden toy boat', enable_texture: true }, 2);
await run('remove-background', 'image', { model: 'fal_birefnet', image_media_tokens: [image] }, 3);
await run('audio', 'audio', { model: 'stable_audio', prompt: 'Gentle ambient piano music, peaceful, no vocals' }, 3);
await run('tripo-splat', 'splat', { model: 'tripo_splat', image_media_tokens: [image] }, .1);
await run('world', 'world', { model: 'hunyuan_world', image_media_tokens: [image], labels_fg1: 'boat', labels_fg2: 'boat', classes: 'boat, background' }, .5);
await run('video-prompt', 'text', { model: 'video_prompt', prompt: 'A toy boat floating peacefully on a pond' }, .02);
// 2026-10-07 catalog extension. Cheap image/audio/mesh checks only; Kling 2.6 and
// Veo 3.1 stay schema-verified because a single run costs $0.35–$3.20.
await run('flux-dev', 'image', { model: 'flux_1_dev', prompt: 'A small red wooden toy boat on a plain light grey background, studio product photograph', image_batch_count: 1, aspect_ratio: 'square' }, .03);
await run('seedream-4-text', 'image', { model: 'seedream_4', prompt: 'A small wooden toy boat on a white background', image_batch_count: 1 }, .04);
await run('nano-2-edit', 'image', { model: 'nano_banana_2', prompt: 'Make the toy boat green. Preserve its shape.', image_media_tokens: [image], image_batch_count: 1, resolution: 'one_k' }, .09);
await run('sfx', 'audio', { model: 'elevenlabs_sfx', prompt: 'Small wooden boat creaking gently on calm water', duration_seconds: 4 }, .03);
await run('mesh-v3-image', 'mesh', { model: 'hunyuan_3d_3', image_media_tokens: [image], enable_texture: true }, .1);
console.log(`Smoke finished. Reserved maximum planning budget: $${Object.values(ledger.runs).reduce((sum, e) => sum + e.reservedUSD, 0).toFixed(2)}. This is not a billing statement.`);

function maskPng(size) {
  const rows = Buffer.alloc((size + 1) * size);
  for (let y = size / 4; y < size * 3 / 4; y++) rows.fill(255, y * (size + 1) + 1 + size / 4, y * (size + 1) + 1 + size * 3 / 4);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8;
  const chunk = (type, data) => {
    const content = Buffer.concat([Buffer.from(type), data]); let crc = 0xffffffff;
    for (const byte of content) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0); }
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const checksum = Buffer.alloc(4); checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
    return Buffer.concat([len, content, checksum]);
  };
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
}
