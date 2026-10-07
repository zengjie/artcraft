import { fail } from './common.mjs';

const RATIOS = { wide: '16:9', tall: '9:16', square: '1:1', wide_sixteen_by_nine: '16:9', tall_nine_by_sixteen: '9:16', wide_four_by_three: '4:3', tall_three_by_four: '3:4' };
const FLUX_SIZES = { wide: 'landscape_16_9', tall: 'portrait_16_9', square: 'square_hd', wide_sixteen_by_nine: 'landscape_16_9', tall_nine_by_sixteen: 'portrait_16_9', wide_four_by_three: 'landscape_4_3', tall_three_by_four: 'portrait_4_3' };
// Seedream accepts explicit pixel sizes; keep the long edge at its 2K default.
const SEEDREAM_SIZES = { square: [2048, 2048], wide: [2048, 1152], tall: [1152, 2048], wide_sixteen_by_nine: [2048, 1152], tall_nine_by_sixteen: [1152, 2048], wide_four_by_three: [2048, 1536], tall_three_by_four: [1536, 2048] };
const IMAGE_RESOLUTIONS = { half_k: '0.5K', one_k: '1K', two_k: '2K', four_k: '4K' };
const VIDEO_RESOLUTIONS = { seven_twenty_p: '720p', ten_eighty_p: '1080p' };

// List prices read from the fal pricing API on 2026-10-07. They are reference
// values for the UI; the final bill always comes from fal.
const perImage = usd => ({ usd, unit: 'image' });
const perMegapixel = usd => ({ usd, unit: 'megapixel' });
const perSecond = usd => ({ usd, unit: 'second' });
const perRequest = usd => ({ usd, unit: 'request' });
const perComputeSecond = usd => ({ usd, unit: 'compute_second' });
const perUnit = usd => ({ usd, unit: 'unit' });

const baseImage = {
  text_prompt_supported: true, text_prompt_max_length: 4000,
  aspect_ratio_options: Object.keys(RATIOS), aspect_ratio_default: 'square',
  batch_size_options: [1, 2, 3, 4], batch_size_default: 1, batch_size_min: 1, batch_size_max: 4,
  resolution_options: [], quality_options: [], negative_text_prompt_supported: false,
  image_refs_supported: false, image_refs_max: 0,
};
const baseVideo = {
  text_prompt_supported: true, text_to_video_supported: true, text_prompt_max_length: 2500,
  starting_keyframe_supported: true, starting_keyframe_required: false, ending_keyframe_supported: false,
  duration_seconds_options: [5, 10], duration_seconds_default: 5, duration_seconds_min: 5, duration_seconds_max: 10,
  aspect_ratio_options: ['wide_sixteen_by_nine', 'tall_nine_by_sixteen', 'square'], aspect_ratio_default: 'wide_sixteen_by_nine',
  batch_size_options: [1], batch_size_default: 1, batch_size_max: 1,
  image_references_supported: false, video_references_supported: false, audio_references_supported: false,
  character_references_supported: false, show_generate_with_sound_toggle: false,
  negative_text_prompt_supported: true, resolution_options: [], quality_options: [], bitrate_options: [],
};
const nanoFamily = { ...baseImage, image_refs_supported: true, image_refs_max: 8 };

export const MODELS = [
  { model: 'tripo_splat', full_name: 'TripoSplat', modality: 'splat', endpoint: 'tripo3d/triposplat', image_refs_supported: true, image_refs_max: 1, price: perRequest(0.05) },
  { model: 'hunyuan_world', full_name: 'Hunyuan World', modality: 'world', endpoint: 'fal-ai/hunyuan_world/image-to-world', image_refs_supported: true, image_refs_max: 1, world_labels_required: true, price: perRequest(0.3) },
  { model: 'video_prompt', full_name: 'Video Prompt Generator', modality: 'text', endpoint: 'fal-ai/video-prompt-generator', text_prompt_supported: true, image_refs_supported: true, image_refs_max: 1, price: perRequest(0.001) },
  { model: 'qwen_edit_2511_angles', full_name: 'Qwen 2511 Angles', modality: 'image', endpoint: 'fal-ai/qwen-image-edit-2511-multiple-angles', image_refs_supported: true, image_refs_max: 1, text_prompt_supported: false, price: perMegapixel(0.035) },
  { model: 'hunyuan_3d_v3_text', full_name: 'Hunyuan 3D V3 Text', modality: 'mesh', endpoint: 'fal-ai/hunyuan3d-v3/text-to-3d', text_prompt_supported: true, text_prompt_max_length: 1024, price: perUnit(0.015) },
  { model: 'flux_1_schnell', full_name: 'FLUX.1 Schnell', modality: 'image', endpoint: 'fal-ai/flux/schnell', ...baseImage, price: perMegapixel(0.003) },
  { model: 'flux_1_dev', full_name: 'FLUX.1 Dev', modality: 'image', endpoint: 'fal-ai/flux/dev', ...baseImage, price: perMegapixel(0.025) },
  { model: 'nano_banana', full_name: 'Nano Banana', modality: 'image', endpoint: 'fal-ai/nano-banana', ...nanoFamily, price: perImage(0.0398) },
  { model: 'nano_banana_2', full_name: 'Nano Banana 2', modality: 'image', endpoint: 'fal-ai/nano-banana-2', ...nanoFamily, image_refs_max: 6, resolution_options: ['half_k', 'one_k', 'two_k', 'four_k'], resolution_default: 'one_k', price: perImage(0.08) },
  { model: 'nano_banana_pro', full_name: 'Nano Banana Pro', modality: 'image', endpoint: 'fal-ai/nano-banana-pro', ...nanoFamily, image_refs_max: 4, resolution_options: ['one_k', 'two_k', 'four_k'], resolution_default: 'one_k', price: perImage(0.15) },
  { model: 'seedream_4', full_name: 'Seedream 4', modality: 'image', endpoint: 'fal-ai/bytedance/seedream/v4', ...baseImage, image_refs_supported: true, image_refs_max: 6, price: perImage(0.03) },
  { model: 'seedream_4p5', full_name: 'Seedream 4.5', modality: 'image', endpoint: 'fal-ai/bytedance/seedream/v4.5', ...baseImage, image_refs_supported: true, image_refs_max: 6, price: perImage(0.04) },
  { model: 'kling_2p5_turbo_pro', full_name: 'Kling 2.5 Turbo Pro', modality: 'video', endpoint: 'fal-ai/kling-video/v2.5-turbo/pro', ...baseVideo, ending_keyframe_supported: true, price: perSecond(0.07) },
  { model: 'kling_2p6_pro', full_name: 'Kling 2.6 Pro', modality: 'video', endpoint: 'fal-ai/kling-video/v2.6/pro', ...baseVideo, ending_keyframe_supported: true, show_generate_with_sound_toggle: true, price: perSecond(0.07) },
  { model: 'veo_3p1', full_name: 'Veo 3.1', modality: 'video', endpoint: 'fal-ai/veo3.1', ...baseVideo, text_prompt_max_length: 5000,
    duration_seconds_options: [4, 6, 8], duration_seconds_default: 8, duration_seconds_min: 4, duration_seconds_max: 8,
    aspect_ratio_options: ['wide_sixteen_by_nine', 'tall_nine_by_sixteen'], resolution_options: ['seven_twenty_p', 'ten_eighty_p'], resolution_default: 'seven_twenty_p',
    show_generate_with_sound_toggle: true, price: perSecond(0.4) },
  { model: 'veo_3p1_fast', full_name: 'Veo 3.1 Fast', modality: 'video', endpoint: 'fal-ai/veo3.1/fast', ...baseVideo, text_prompt_max_length: 5000,
    duration_seconds_options: [4, 6, 8], duration_seconds_default: 8, duration_seconds_min: 4, duration_seconds_max: 8,
    aspect_ratio_options: ['wide_sixteen_by_nine', 'tall_nine_by_sixteen'], resolution_options: ['seven_twenty_p', 'ten_eighty_p'], resolution_default: 'seven_twenty_p',
    show_generate_with_sound_toggle: true, price: perSecond(0.15) },
  { model: 'stable_audio', full_name: 'Stable Audio Open', modality: 'audio', endpoint: 'fal-ai/stable-audio', text_prompt_supported: true, price: perComputeSecond(0.00125) },
  { model: 'elevenlabs_sfx', full_name: 'ElevenLabs Sound Effects', modality: 'audio', endpoint: 'fal-ai/elevenlabs/sound-effects/v2', text_prompt_supported: true, extra_info_short: 'Short sound effects from a description', price: perSecond(0.002) },
  { model: 'hunyuan_3d_2p1', full_name: 'Hunyuan 3D 2.1', modality: 'mesh', endpoint: 'fal-ai/hunyuan3d-v21', image_input_supported: true, text_prompt_supported: false, texture_toggle_supported: true, price: perRequest(0.3) },
  { model: 'hunyuan_3d_3', full_name: 'Hunyuan 3D V3', modality: 'mesh', endpoint: 'fal-ai/hunyuan3d-v3/image-to-3d', image_input_supported: true, text_prompt_supported: false, texture_toggle_supported: true, price: perUnit(0.015) },
  { model: 'fal_birefnet', full_name: 'BiRefNet Background Removal', modality: 'image', endpoint: 'fal-ai/birefnet', hidden: true, price: perComputeSecond(0.0008) },
  { model: 'flux_pro_1', full_name: 'FLUX Fill Pro', modality: 'image', endpoint: 'fal-ai/flux-pro/v1/fill', text_prompt_supported: true, hidden: true, price: perMegapixel(0.05) },
];

export function listing(modality) {
  const models = MODELS.filter(m => m.modality === modality && !m.hidden).map(({ modality, endpoint, hidden, ...m }) => ({ is_disabled: false, ...m }));
  return { success: true, models, providers: [{ provider: 'artcraft', models: models.map(m => ({ model: m.model, overrides: null })) }] };
}

// Client input cannot select a URL, headers, or arbitrary fal endpoint.
export function buildInput(modality, request, resolve) {
  const model = MODELS.find(m => m.model === request.model && m.modality === modality);
  if (!model) fail(400, '此模型尚未适配 fal Proxy，请从模型列表重新选择');
  if (request.enable_system_prompt === true && !model.model.startsWith('nano_banana')) fail(400, 'Unsupported editor system prompt for this model');
  validateParameters(model, request);
  let prompt = request.prompt ?? '';
  if (typeof prompt !== 'string' || prompt.length > (model.text_prompt_max_length ?? 4000)) fail(400, 'Invalid prompt');
  if (model.text_prompt_supported && !prompt.trim()) fail(400, '请输入提示词');
  if (request.enable_system_prompt === true) {
    const instruction = request.editor_context === 'scene'
      ? 'Use the supplied 3D scene image as the composition guide. Preserve camera angle, perspective, object placement and silhouettes while rendering the scene according to the user instructions.'
      : 'Edit the supplied canvas according to the user instructions. Preserve composition and unrequested content. Treat drawn marks and annotations as editing instructions, not final artwork.';
    prompt = `${instruction}\nUser instructions: ${prompt}`;
  }
  const refs = request.image_media_tokens ?? request.reference_image_media_tokens ?? [];
  if (!Array.isArray(refs) || refs.length > 8) fail(400, 'Too many reference images');
  if (model.image_refs_max != null && refs.length > model.image_refs_max) fail(400, `This model accepts at most ${model.image_refs_max} reference image(s)`);
  const imageUrls = refs.map(t => resolve(t, 'image'));
  const batch = request.image_batch_count ?? request.batch_size ?? 1;
  if (!Number.isInteger(batch) || batch < 1 || batch > 4) fail(400, 'Image count must be 1–4');
  const aspect = request.aspect_ratio ?? (modality === 'video' ? 'wide_sixteen_by_nine' : 'square');
  const ratio = RATIOS[aspect];
  if (!ratio && aspect !== 'auto') fail(400, 'Unsupported aspect ratio');
  const resolution = pickResolution(model, request.resolution);
  let endpoint = model.endpoint;
  let input = { prompt };
  if (model.model === 'tripo_splat') {
    if (imageUrls.length !== 1) fail(400, 'TripoSplat requires one image');
    input = { image_url: imageUrls[0], output_format: 'ply' };
  } else if (model.model === 'hunyuan_world') {
    if (imageUrls.length !== 1) fail(400, 'Hunyuan World requires one image');
    input = { image_url: imageUrls[0] };
    for (const key of ['labels_fg1', 'labels_fg2', 'classes']) {
      if (typeof request[key] !== 'string' || !request[key].trim() || request[key].length > 500) fail(400, `Missing or invalid ${key}`);
      input[key] = request[key];
    }
  } else if (model.model === 'video_prompt') {
    if (imageUrls.length > 1) fail(400, 'Prompt generator accepts at most one image');
    input = { input_concept: prompt, model: 'google/gemini-2.5-flash-lite', prompt_length: 'Medium' };
    if (imageUrls.length) input.image_url = imageUrls[0];
  } else if (model.model === 'qwen_edit_2511_angles') {
    if (imageUrls.length !== 1) fail(400, 'Angles requires exactly one reference image');
    const range = (name, fallback, min, max) => {
      const value = request[name] ?? fallback;
      if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) fail(400, `Invalid ${name}`);
      return value;
    };
    input = { image_urls: imageUrls, horizontal_angle: range('horizontal_angle', 0, 0, 360), vertical_angle: range('vertical_angle', 0, -30, 90), zoom: range('zoom', 5, 0, 10), additional_prompt: prompt, num_images: batch };
  } else if (model.model === 'flux_1_schnell' || model.model === 'flux_1_dev') {
    if (imageUrls.length) fail(400, 'This FLUX endpoint does not support image references');
    input = { prompt, num_images: batch, image_size: FLUX_SIZES[aspect] || 'square_hd' };
  } else if (model.model.startsWith('nano_banana')) {
    if (request.inpainting_mask_image_media_token) fail(400, 'Nano Banana does not accept an inpainting mask');
    input = { prompt, num_images: batch, aspect_ratio: ratio || 'auto' };
    if (resolution) input.resolution = resolution;
    if (imageUrls.length) { endpoint += '/edit'; input.image_urls = imageUrls; }
  } else if (model.model.startsWith('seedream_')) {
    const [width, height] = SEEDREAM_SIZES[aspect] || SEEDREAM_SIZES.square;
    input = { prompt, num_images: batch, image_size: { width, height } };
    endpoint += imageUrls.length ? '/edit' : '/text-to-image';
    if (imageUrls.length) input.image_urls = imageUrls;
  } else if (modality === 'video') {
    if ((request.video_batch_count ?? 1) !== 1) fail(400, 'Video batch count must be 1');
    const duration = request.duration_seconds ?? model.duration_seconds_default;
    if (!model.duration_seconds_options.includes(duration)) fail(400, `Duration must be one of ${model.duration_seconds_options.join(', ')} seconds`);
    for (const field of ['reference_image_media_tokens', 'reference_video_media_tokens', 'reference_audio_media_tokens', 'reference_character_tokens']) {
      if (request[field]?.length) fail(400, `${field} is unsupported by this model`);
    }
    if (request.generate_audio === true && !model.show_generate_with_sound_toggle) fail(400, 'This model does not generate audio');
    const start = request.start_frame_image_media_token ?? request.image_media_token;
    const end = request.end_frame_image_media_token;
    if (end && !start) fail(400, 'An end frame requires a start frame');
    if (end && !model.ending_keyframe_supported) fail(400, 'This model does not accept an end frame');
    input = { prompt };
    if (request.negative_prompt) input.negative_prompt = request.negative_prompt;
    if (model.model.startsWith('veo_')) {
      input.duration = `${duration}s`;
      input.generate_audio = request.generate_audio === true;
      if (resolution) input.resolution = resolution;
      if (start) { endpoint += '/image-to-video'; input.image_url = resolve(start, 'image'); input.aspect_ratio = 'auto'; }
      else input.aspect_ratio = ratio;
    } else {
      input.duration = String(duration);
      if (model.show_generate_with_sound_toggle) input.generate_audio = request.generate_audio === true;
      endpoint += start ? '/image-to-video' : '/text-to-video';
      if (start) {
        const startKey = model.model === 'kling_2p6_pro' ? 'start_image_url' : 'image_url';
        const endKey = model.model === 'kling_2p6_pro' ? 'end_image_url' : 'tail_image_url';
        input[startKey] = resolve(start, 'image');
        if (end) input[endKey] = resolve(end, 'image');
      } else input.aspect_ratio = ratio;
    }
  } else if (modality === 'mesh') {
    if (model.model === 'hunyuan_3d_v3_text') {
      if (imageUrls.length) fail(400, 'Text to Mesh does not accept image references');
      input = { prompt, generate_type: request.enable_texture === false ? 'Geometry' : 'Normal', enable_pbr: request.enable_texture ?? true };
    } else if (model.model === 'hunyuan_3d_3') {
      if (imageUrls.length !== 1) fail(400, 'Hunyuan 3D requires one image');
      input = { input_image_url: imageUrls[0], generate_type: request.enable_texture === false ? 'Geometry' : 'Normal', enable_pbr: request.enable_texture ?? true };
    } else {
      if (imageUrls.length !== 1) fail(400, 'Hunyuan 3D requires one image');
      input = { input_image_url: imageUrls[0], textured_mesh: request.enable_texture ?? false };
    }
  } else if (modality === 'audio') {
    if (imageUrls.length || request.audio_media_tokens?.length) fail(400, 'This audio model supports text input only');
    if (model.model === 'elevenlabs_sfx') {
      input = { text: prompt };
      if (request.duration_seconds != null) {
        if (typeof request.duration_seconds !== 'number' || request.duration_seconds < 0.5 || request.duration_seconds > 22) fail(400, 'Sound effect duration must be 0.5–22 seconds');
        input.duration_seconds = request.duration_seconds;
      }
    } else input = { prompt, seconds_total: 30 };
  } else if (model.model === 'fal_birefnet') {
    input = { image_url: resolve(request.media_file_token ?? refs[0], 'image') };
  } else if (model.model === 'flux_pro_1') {
    input = { prompt, image_url: resolve(request.image_media_token ?? refs[0], 'image'), mask_url: resolve(request.mask_media_token ?? request.inpainting_mask_image_media_token, 'image'), num_images: batch };
  }
  return { model, endpoint, input };
}

function pickResolution(model, value) {
  const options = model.resolution_options ?? [];
  if (value == null || value === '') value = model.resolution_default;
  if (value == null) return undefined;
  if (!options.length) fail(400, `Unsupported parameter for ${model.model}: resolution`);
  const table = model.modality === 'video' ? VIDEO_RESOLUTIONS : IMAGE_RESOLUTIONS;
  if (!options.includes(value) || !table[value]) fail(400, 'Unsupported resolution');
  return table[value];
}

// Reject meaningful unsupported fields before any paid request. Metadata is local.
function validateParameters(model, request) {
  const common = ['model', 'prompt', 'idempotency_token', 'uuid_idempotency_token', 'enable_system_prompt', 'editor_context'];
  const image = ['image_batch_count', 'batch_size'];
  const refs = ['image_media_tokens', 'reference_image_media_tokens'];
  const video = ['aspect_ratio', 'duration_seconds', 'negative_prompt', 'video_batch_count', 'start_frame_image_media_token', 'image_media_token', 'end_frame_image_media_token', 'generate_audio', 'reference_image_media_tokens', 'reference_video_media_tokens', 'reference_audio_media_tokens', 'reference_character_tokens'];
  const allowed = {
    tripo_splat: [...refs],
    hunyuan_world: [...refs, 'labels_fg1', 'labels_fg2', 'classes'],
    video_prompt: [...refs],
    flux_1_schnell: [...image, ...refs, 'aspect_ratio'],
    flux_1_dev: [...image, ...refs, 'aspect_ratio'],
    nano_banana: [...image, ...refs, 'aspect_ratio', 'inpainting_mask_image_media_token'],
    nano_banana_2: [...image, ...refs, 'aspect_ratio', 'resolution', 'inpainting_mask_image_media_token'],
    nano_banana_pro: [...image, ...refs, 'aspect_ratio', 'resolution', 'inpainting_mask_image_media_token'],
    seedream_4: [...image, ...refs, 'aspect_ratio'],
    seedream_4p5: [...image, ...refs, 'aspect_ratio'],
    qwen_edit_2511_angles: [...image, ...refs, 'horizontal_angle', 'vertical_angle', 'zoom'],
    flux_pro_1: [...image, ...refs, 'image_media_token', 'mask_media_token', 'inpainting_mask_image_media_token', 'num_images'],
    fal_birefnet: [...refs, 'media_file_token'],
    stable_audio: [...refs, 'audio_media_tokens'],
    elevenlabs_sfx: [...refs, 'audio_media_tokens', 'duration_seconds'],
    hunyuan_3d_2p1: [...refs, 'enable_texture'],
    hunyuan_3d_3: [...refs, 'enable_texture'],
    hunyuan_3d_v3_text: [...refs, 'enable_texture'],
    kling_2p5_turbo_pro: video,
    kling_2p6_pro: video,
    veo_3p1: [...video, 'resolution'],
    veo_3p1_fast: [...video, 'resolution'],
  }[model.model] || [];
  for (const [key, value] of Object.entries(request)) {
    if (value != null && value !== '' && !common.includes(key) && !allowed.includes(key)) fail(400, `Unsupported parameter for ${model.model}: ${key}`);
  }
  if (request.enable_texture != null && typeof request.enable_texture !== 'boolean') fail(400, 'enable_texture must be boolean');
  if (request.negative_prompt != null && typeof request.negative_prompt !== 'string') fail(400, 'negative_prompt must be text');
}
