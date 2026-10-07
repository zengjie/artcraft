import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInput, MODELS } from '../src/models.mjs';
const MODEL = id => MODELS.find(m => m.model === id);
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

test('every model advertises a fal list price with a known unit', () => {
  const units = new Set(['image', 'megapixel', 'second', 'request', 'compute_second', 'megatoken', 'unit']);
  for (const model of capabilities().models) {
    assert.ok(model.price && model.price.usd > 0 && units.has(model.price.unit), model.model);
  }
});

test('FLUX Dev, Seedream and Nano Banana variants map sizes, resolutions and edit endpoints', () => {
  assert.deepEqual(buildInput('image', { model: 'flux_1_dev', prompt: 'fox', aspect_ratio: 'wide_sixteen_by_nine', image_batch_count: 2 }, resolve), { model: MODEL('flux_1_dev'), endpoint: 'fal-ai/flux/dev', input: { prompt: 'fox', num_images: 2, image_size: 'landscape_16_9' } });
  const text = buildInput('image', { model: 'seedream_4', prompt: 'fox', aspect_ratio: 'tall_nine_by_sixteen' }, resolve);
  assert.equal(text.endpoint, 'fal-ai/bytedance/seedream/v4/text-to-image');
  assert.deepEqual(text.input, { prompt: 'fox', num_images: 1, image_size: { width: 1152, height: 2048 } });
  const edit = buildInput('image', { model: 'seedream_4p5', prompt: 'make it night', image_media_tokens: ['image'] }, resolve);
  assert.equal(edit.endpoint, 'fal-ai/bytedance/seedream/v4.5/edit');
  assert.deepEqual(edit.input.image_urls, ['https://assets.example/image.png']);
  const pro = buildInput('image', { model: 'nano_banana_pro', prompt: 'fox', resolution: 'two_k', image_media_tokens: ['image'] }, resolve);
  assert.equal(pro.endpoint, 'fal-ai/nano-banana-pro/edit');
  assert.equal(pro.input.resolution, '2K');
  assert.throws(() => buildInput('image', { model: 'nano_banana_pro', prompt: 'fox', resolution: 'half_k' }, resolve), /Unsupported resolution/);
  assert.throws(() => buildInput('image', { model: 'nano_banana', prompt: 'fox', resolution: 'one_k' }, resolve), /resolution/);
  assert.throws(() => buildInput('image', { model: 'nano_banana_pro', prompt: 'fox', image_media_tokens: ['a', 'b', 'c', 'd', 'e'] }, resolve), /at most 4/);
});

test('Kling 2.6 and Veo 3.1 keep provider-specific keyframe, audio and duration contracts', () => {
  const kling = buildInput('video', { model: 'kling_2p6_pro', prompt: 'waves', start_frame_image_media_token: 'image', end_frame_image_media_token: 'image', generate_audio: true, duration_seconds: 10 }, resolve);
  assert.equal(kling.endpoint, 'fal-ai/kling-video/v2.6/pro/image-to-video');
  assert.deepEqual(kling.input, { prompt: 'waves', duration: '10', generate_audio: true, start_image_url: 'https://assets.example/image.png', end_image_url: 'https://assets.example/image.png' });
  assert.throws(() => buildInput('video', { model: 'kling_2p5_turbo_pro', prompt: 'waves', generate_audio: true }, resolve), /does not generate audio/);
  const veo = buildInput('video', { model: 'veo_3p1_fast', prompt: 'waves', duration_seconds: 6, resolution: 'ten_eighty_p', aspect_ratio: 'tall_nine_by_sixteen' }, resolve);
  assert.equal(veo.endpoint, 'fal-ai/veo3.1/fast');
  assert.deepEqual(veo.input, { prompt: 'waves', duration: '6s', generate_audio: false, resolution: '1080p', aspect_ratio: '9:16' });
  const veoImage = buildInput('video', { model: 'veo_3p1', prompt: 'waves', image_media_token: 'image' }, resolve);
  assert.equal(veoImage.endpoint, 'fal-ai/veo3.1/image-to-video');
  assert.deepEqual(veoImage.input, { prompt: 'waves', duration: '8s', generate_audio: false, resolution: '720p', image_url: 'https://assets.example/image.png', aspect_ratio: 'auto' });
  assert.throws(() => buildInput('video', { model: 'veo_3p1', prompt: 'waves', duration_seconds: 5 }, resolve), /Duration must be one of 4, 6, 8/);
  assert.throws(() => buildInput('video', { model: 'veo_3p1', prompt: 'waves', end_frame_image_media_token: 'image', image_media_token: 'image' }, resolve), /end frame/);
});

test('Hunyuan 3D V3 image and ElevenLabs sound effects use their own fields', () => {
  assert.deepEqual(buildInput('mesh', { model: 'hunyuan_3d_3', image_media_tokens: ['image'], enable_texture: false }, resolve).input, { input_image_url: 'https://assets.example/image.png', generate_type: 'Geometry', enable_pbr: false });
  assert.deepEqual(buildInput('audio', { model: 'elevenlabs_sfx', prompt: 'door creak', duration_seconds: 3 }, resolve).input, { text: 'door creak', duration_seconds: 3 });
  assert.throws(() => buildInput('audio', { model: 'elevenlabs_sfx', prompt: 'door creak', duration_seconds: 60 }, resolve), /0.5–22/);
  assert.throws(() => buildInput('audio', { model: 'stable_audio', prompt: 'rain', duration_seconds: 3 }, resolve), /Unsupported parameter/);
});

test('Seedance 1.5 Pro and 1.0 Lite map duration, resolution, audio and keyframes to the fal endpoints', () => {
  const pro = buildInput('video', { model: 'seedance_1p5_pro', prompt: 'waves', duration_seconds: 8, resolution: 'ten_eighty_p', generate_audio: true, start_frame_image_media_token: 'image', end_frame_image_media_token: 'image' }, resolve);
  assert.equal(pro.endpoint, 'fal-ai/bytedance/seedance/v1.5/pro/image-to-video');
  assert.deepEqual(pro.input, { prompt: 'waves', duration: '8', resolution: '1080p', generate_audio: true, image_url: 'https://assets.example/image.png', end_image_url: 'https://assets.example/image.png', aspect_ratio: 'auto' });
  const lite = buildInput('video', { model: 'seedance_1p0_lite', prompt: 'waves', duration_seconds: 3, aspect_ratio: 'wide_four_by_three' }, resolve);
  assert.equal(lite.endpoint, 'fal-ai/bytedance/seedance/v1/lite/text-to-video');
  assert.deepEqual(lite.input, { prompt: 'waves', duration: '3', resolution: '720p', aspect_ratio: '4:3' });
  assert.throws(() => buildInput('video', { model: 'seedance_1p0_lite', prompt: 'waves', generate_audio: true }, resolve), /does not generate audio/);
  assert.throws(() => buildInput('video', { model: 'seedance_1p5_pro', prompt: 'waves', duration_seconds: 3 }, resolve), /Duration must be one of/);
  assert.throws(() => buildInput('video', { model: 'seedance_1p5_pro', prompt: 'waves', reference_image_media_tokens: ['image'] }, resolve), /unsupported/);
});

test('Seedance 2.x uses the bytedance namespace, reference-to-video and per-token pricing', () => {
  const text = buildInput('video', { model: 'seedance_2p5', prompt: 'waves', duration_seconds: 20, resolution: 'ten_eighty_p', generate_audio: true }, resolve);
  assert.equal(text.endpoint, 'bytedance/seedance-2.5/text-to-video');
  assert.deepEqual(text.input, { prompt: 'waves', duration: '20', resolution: '1080p', generate_audio: true, aspect_ratio: '16:9' });
  const refs = buildInput('video', { model: 'seedance_2p0', prompt: 'waves', reference_image_media_tokens: ['image', 'image'] }, resolve);
  assert.equal(refs.endpoint, 'bytedance/seedance-2.0/enterprise/v2/reference-to-video');
  assert.deepEqual(refs.input.image_urls, ['https://assets.example/image.png', 'https://assets.example/image.png']);
  const fast = buildInput('video', { model: 'seedance_2p0_fast', prompt: 'waves', image_media_token: 'image', end_frame_image_media_token: 'image' }, resolve);
  assert.equal(fast.endpoint, 'bytedance/seedance-2.0/enterprise/v2/fast/image-to-video');
  assert.equal(fast.input.end_image_url, 'https://assets.example/image.png');
  assert.throws(() => buildInput('video', { model: 'seedance_2p0_fast', prompt: 'waves', resolution: 'ten_eighty_p' }, resolve), /Unsupported resolution/);
  assert.throws(() => buildInput('video', { model: 'seedance_2p0', prompt: 'waves', reference_image_media_tokens: ['image'], image_media_token: 'image' }, resolve), /either a start frame/);
  assert.throws(() => buildInput('video', { model: 'seedance_2p5', prompt: 'waves', duration_seconds: 31 }, resolve), /Duration must be one of/);
  assert.equal(MODEL('seedance_2p5').price.unit, 'megatoken');
});
