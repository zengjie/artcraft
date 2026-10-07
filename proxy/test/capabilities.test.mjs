import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInput } from '../src/models.mjs';
import { capabilities } from '../src/capabilities.mjs';
const resolve = id => { assert.ok(['image', 'mask'].includes(id)); return `https://assets.example/${id}.png`; };

test('extension protocol names actual provider and never claims unsupported capabilities', () => {
  const caps = capabilities();
  assert.equal(caps.provider, 'fal_proxy');
  assert.equal(caps.protocol_version, 1);
  assert.equal(caps.billing.estimate_available, false);
  assert.ok(caps.unsupported.some(c => c.capability === 'marble'));
  assert.equal(caps.models.find(m => m.model === 'hunyuan_3d_v3_text').reference_limit, 0);
  assert.ok(caps.models.find(m => m.model === 'flux_pro_1').mask_required);
  assert.ok(!JSON.stringify(caps).includes('endpoint'));
});
test('Angles preserves camera controls and rejects invalid ranges', () => {
  const req = { model: 'qwen_edit_2511_angles', image_media_tokens: ['image'], horizontal_angle: 90, vertical_angle: -20, zoom: 8, prompt: 'warm light' };
  const result = buildInput('image', req, resolve);
  assert.equal(result.endpoint, 'fal-ai/qwen-image-edit-2511-multiple-angles');
  assert.deepEqual(result.input, { image_urls: ['https://assets.example/image.png'], horizontal_angle: 90, vertical_angle: -20, zoom: 8, additional_prompt: 'warm light', num_images: 1 });
  assert.throws(() => buildInput('image', { ...req, zoom: 11 }, resolve), /Invalid zoom/);
  assert.throws(() => buildInput('image', { ...req, image_media_tokens: [] }, resolve), /one reference/);
});
test('Fill receives the actual source image and mask through the extension contract', () => {
  const result = buildInput('image', { model: 'flux_pro_1', prompt: 'a tree', image_media_tokens: ['image'], inpainting_mask_image_media_token: 'mask' }, resolve);
  assert.equal(result.endpoint, 'fal-ai/flux-pro/v1/fill');
  assert.deepEqual(result.input, { prompt: 'a tree', image_url: 'https://assets.example/image.png', mask_url: 'https://assets.example/mask.png', num_images: 1 });
});
test('text Mesh is explicit V3, image Mesh preserves its V2.1 mapping', () => {
  assert.deepEqual(buildInput('mesh', { model: 'hunyuan_3d_v3_text', prompt: 'wooden chest', enable_texture: false }, resolve).input, { prompt: 'wooden chest', generate_type: 'Geometry', enable_pbr: false });
  assert.throws(() => buildInput('mesh', { model: 'hunyuan_3d_v3_text', prompt: 'x'.repeat(1025) }, resolve), /Invalid prompt/);
  assert.deepEqual(buildInput('mesh', { model: 'hunyuan_3d_2p1', image_media_tokens: ['image'], enable_texture: true }, resolve).input, { input_image_url: 'https://assets.example/image.png', textured_mesh: true });
});
test('unsupported paid options fail instead of being silently ignored', () => {
  for (const input of [{ seed: 12 }, { resolution: 'four_k' }, { enable_system_prompt: true }]) {
    assert.throws(() => buildInput('image', { model: 'flux_1_schnell', prompt: 'fox', ...input }, resolve), /Unsupported|not supported/);
  }
  assert.throws(() => buildInput('splat', { model: 'marble_0p1_plus' }, resolve));
});

test('job quotas reject invalid configuration rather than becoming unlimited', async () => {
  const { loadConfig } = await import('../src/server.mjs');
  for (const value of ['NaN', '-1', '0', '1.5']) assert.throws(() => loadConfig({ MAX_DAILY_JOBS_PER_USER: value }), /positive integers/);
});

test('daily quota includes uncertain submissions and never sends a second paid request', async () => {
  const { Generation } = await import('../src/generation.mjs');
  const { Store } = await import('../src/store.mjs');
  const store = new Store(':memory:');
  let calls = 0;
  const generation = new Generation(store, { resolve }, { falKey: 'test', maxActiveJobs: 5, maxDailyJobs: 1 }, async () => { calls++; throw new Error('transport timeout'); });
  const request = { model: 'flux_1_schnell', prompt: 'fox', idempotency_token: 'one' };
  try {
    await assert.rejects(() => generation.submit('owner', 'image', request), /timeout/);
    await assert.rejects(() => generation.submit('owner', 'image', { ...request, idempotency_token: 'two' }), /Daily generation limit/);
    await assert.rejects(() => generation.submit('owner', 'image', request), /pending or uncertain/);
    assert.equal(calls, 1);
  } finally { store.close(); }
});


test('Splat, world and prompt models keep distinct input and output semantics', () => {
  assert.deepEqual(buildInput('splat', { model: 'tripo_splat', image_media_tokens: ['image'] }, resolve).input, { image_url: 'https://assets.example/image.png', output_format: 'ply' });
  const world = { model: 'hunyuan_world', image_media_tokens: ['image'], labels_fg1: 'tree', labels_fg2: 'mountain', classes: 'landscape' };
  assert.deepEqual(buildInput('world', world, resolve).input, { image_url: 'https://assets.example/image.png', labels_fg1: 'tree', labels_fg2: 'mountain', classes: 'landscape' });
  assert.throws(() => buildInput('world', { ...world, classes: '' }, resolve), /classes/);
  assert.deepEqual(buildInput('text', { model: 'video_prompt', prompt: 'a boat' }, resolve).input, { input_concept: 'a boat', model: 'google/gemini-2.5-flash-lite', prompt_length: 'Medium' });
});
