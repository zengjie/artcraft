import { fail } from './common.mjs';

const RATIOS = { wide: '16:9', tall: '9:16', square: '1:1', wide_sixteen_by_nine: '16:9', tall_nine_by_sixteen: '9:16', wide_four_by_three: '4:3', tall_three_by_four: '3:4' };
const baseImage = {
  text_prompt_supported: true, text_prompt_max_length: 4000,
  aspect_ratio_options: Object.keys(RATIOS), aspect_ratio_default: 'square',
  batch_size_options: [1, 2, 3, 4], batch_size_default: 1, batch_size_min: 1, batch_size_max: 4,
  resolution_options: [], quality_options: [], negative_text_prompt_supported: false,
  image_refs_supported: false, image_refs_max: 0,
};
export const MODELS = [
  { model: 'tripo_splat', full_name: 'TripoSplat · Image to Gaussian', modality: 'splat', endpoint: 'tripo3d/triposplat', image_refs_supported: true, image_refs_max: 1 },
  { model: 'hunyuan_world', full_name: 'Hunyuan World · Image to World', modality: 'world', endpoint: 'fal-ai/hunyuan_world/image-to-world', image_refs_supported: true, image_refs_max: 1, world_labels_required: true },
  { model: 'video_prompt', full_name: 'Video Prompt Generator · fal', modality: 'text', endpoint: 'fal-ai/video-prompt-generator', text_prompt_supported: true, image_refs_supported: true, image_refs_max: 1 },
  { model: 'qwen_edit_2511_angles', full_name: 'Qwen 2511 · Angles', modality: 'image', endpoint: 'fal-ai/qwen-image-edit-2511-multiple-angles', image_refs_supported: true, image_refs_max: 1, text_prompt_supported: false },
  { model: 'hunyuan_3d_v3_text', full_name: 'Hunyuan 3D V3 · Text to Mesh', modality: 'mesh', endpoint: 'fal-ai/hunyuan3d-v3/text-to-3d', text_prompt_supported: true, text_prompt_max_length: 1024 },
  { model: 'flux_1_schnell', full_name: 'FLUX.1 Schnell · fal', modality: 'image', endpoint: 'fal-ai/flux/schnell', ...baseImage },
  { model: 'nano_banana', full_name: 'Nano Banana · fal', modality: 'image', endpoint: 'fal-ai/nano-banana', ...baseImage, image_refs_supported: true, image_refs_max: 8 },
  { model: 'kling_2p5_turbo_pro', full_name: 'Kling 2.5 Turbo Pro · fal', modality: 'video', endpoint: 'fal-ai/kling-video/v2.5-turbo/pro',
    text_prompt_supported: true, text_to_video_supported: true, text_prompt_max_length: 2500,
    starting_keyframe_supported: true, starting_keyframe_required: false, ending_keyframe_supported: true,
    duration_seconds_options: [5, 10], duration_seconds_default: 5, duration_seconds_min: 5, duration_seconds_max: 10,
    aspect_ratio_options: ['wide_sixteen_by_nine', 'tall_nine_by_sixteen', 'square'], aspect_ratio_default: 'wide_sixteen_by_nine',
    batch_size_options: [1], batch_size_default: 1, batch_size_max: 1,
    image_references_supported: false, video_references_supported: false, audio_references_supported: false,
    character_references_supported: false, show_generate_with_sound_toggle: false,
    negative_text_prompt_supported: true, resolution_options: [], quality_options: [], bitrate_options: [],
  },
  { model: 'stable_audio', full_name: 'Stable Audio Open · fal', modality: 'audio', endpoint: 'fal-ai/stable-audio', text_prompt_supported: true },
  { model: 'hunyuan_3d_2p1', full_name: 'Hunyuan 3D 2.1 · fal', modality: 'mesh', endpoint: 'fal-ai/hunyuan3d-v21', image_input_supported: true, text_prompt_supported: false, texture_toggle_supported: true },
  { model: 'fal_birefnet', full_name: 'BiRefNet Background Removal · fal', modality: 'image', endpoint: 'fal-ai/birefnet', hidden: true },
  { model: 'flux_pro_1', full_name: 'FLUX Fill Pro · fal', modality: 'image', endpoint: 'fal-ai/flux-pro/v1/fill', text_prompt_supported: true, hidden: true },
];

export function listing(modality) {
  const models = MODELS.filter(m => m.modality === modality && !m.hidden).map(({ modality, endpoint, hidden, ...m }) => ({ is_disabled: false, ...m }));
  return { success: true, models, providers: [{ provider: 'artcraft', models: models.map(m => ({ model: m.model, overrides: null })) }] };
}

// Client input cannot select a URL, headers, or arbitrary fal endpoint.
export function buildInput(modality, request, resolve) {
  const model = MODELS.find(m => m.model === request.model && m.modality === modality);
  if (!model) fail(400, '此模型尚未适配 fal Proxy，请从模型列表重新选择');
  if (request.enable_system_prompt === true && request.model !== 'nano_banana') fail(400, 'Unsupported editor system prompt for this model');
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
  const imageUrls = refs.map(t => resolve(t, 'image'));
  const batch = request.image_batch_count ?? request.batch_size ?? 1;
  if (!Number.isInteger(batch) || batch < 1 || batch > 4) fail(400, 'Image count must be 1–4');
  const aspect = request.aspect_ratio ?? (modality === 'video' ? 'wide_sixteen_by_nine' : 'square');
  const ratio = RATIOS[aspect];
  if (!ratio && aspect !== 'auto') fail(400, 'Unsupported aspect ratio');
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
  } else if (model.model === 'flux_1_schnell') {
    if (imageUrls.length) fail(400, 'FLUX Schnell does not support image references');
    input = { prompt, num_images: batch, image_size: { wide: 'landscape_16_9', tall: 'portrait_16_9', square: 'square_hd', wide_sixteen_by_nine: 'landscape_16_9', tall_nine_by_sixteen: 'portrait_16_9', wide_four_by_three: 'landscape_4_3', tall_three_by_four: 'portrait_4_3' }[aspect] || 'square_hd' };
  } else if (model.model === 'nano_banana') {
    if (request.inpainting_mask_image_media_token) fail(400, 'Nano Banana does not accept an inpainting mask');
    input = { prompt, num_images: batch, aspect_ratio: ratio || 'auto' };
    if (imageUrls.length) { endpoint += '/edit'; input.image_urls = imageUrls; }
  } else if (modality === 'video') {
    if ((request.video_batch_count ?? 1) !== 1) fail(400, 'Video batch count must be 1');
    if (![5, 10].includes(request.duration_seconds ?? 5)) fail(400, 'Kling duration must be 5 or 10 seconds');
    for (const field of ['reference_image_media_tokens', 'reference_video_media_tokens', 'reference_audio_media_tokens', 'reference_character_tokens']) {
      if (request[field]?.length) fail(400, `${field} is unsupported by this model`);
    }
    if (request.generate_audio === true) fail(400, 'This model does not generate audio');
    const start = request.start_frame_image_media_token ?? request.image_media_token;
    input = { prompt, duration: String(request.duration_seconds ?? 5) };
    if (request.negative_prompt) input.negative_prompt = request.negative_prompt;
    endpoint += start ? '/image-to-video' : '/text-to-video';
    if (start) {
      input.image_url = resolve(start, 'image');
      if (request.end_frame_image_media_token) input.tail_image_url = resolve(request.end_frame_image_media_token, 'image');
    } else {
      if (request.end_frame_image_media_token) fail(400, 'An end frame requires a start frame');
      input.aspect_ratio = ratio;
    }
  } else if (modality === 'mesh') {
    if (model.model === 'hunyuan_3d_v3_text') {
      if (imageUrls.length) fail(400, 'Text to Mesh does not accept image references');
      input = { prompt, generate_type: request.enable_texture === false ? 'Geometry' : 'Normal', enable_pbr: request.enable_texture ?? true };
    } else {
      if (imageUrls.length !== 1) fail(400, 'Hunyuan 3D requires one image');
      input = { input_image_url: imageUrls[0], textured_mesh: request.enable_texture ?? false };
    }
  } else if (modality === 'audio') {
    if (imageUrls.length || request.audio_media_tokens?.length) fail(400, 'Stable Audio supports text input only');
    input = { prompt, seconds_total: 30 };
  } else if (model.model === 'fal_birefnet') {
    input = { image_url: resolve(request.media_file_token ?? refs[0], 'image') };
  } else if (model.model === 'flux_pro_1') {
    input = { prompt, image_url: resolve(request.image_media_token ?? refs[0], 'image'), mask_url: resolve(request.mask_media_token ?? request.inpainting_mask_image_media_token, 'image'), num_images: batch };
  }
  return { model, endpoint, input };
}

// Reject meaningful unsupported fields before any paid request. Metadata is local.
function validateParameters(model, request) {
  const common = ['model', 'prompt', 'idempotency_token', 'uuid_idempotency_token', 'enable_system_prompt', 'editor_context'];
  const image = ['image_batch_count', 'batch_size'];
  const refs = ['image_media_tokens', 'reference_image_media_tokens'];
  const allowed = {
    tripo_splat: [...refs],
    hunyuan_world: [...refs, 'labels_fg1', 'labels_fg2', 'classes'],
    video_prompt: [...refs],
    flux_1_schnell: [...image, ...refs, 'aspect_ratio'],
    nano_banana: [...image, ...refs, 'aspect_ratio', 'inpainting_mask_image_media_token'],
    qwen_edit_2511_angles: [...image, ...refs, 'horizontal_angle', 'vertical_angle', 'zoom'],
    flux_pro_1: [...image, ...refs, 'image_media_token', 'mask_media_token', 'inpainting_mask_image_media_token', 'num_images'],
    fal_birefnet: [...refs, 'media_file_token'],
    stable_audio: [...refs, 'audio_media_tokens'],
    hunyuan_3d_2p1: [...refs, 'enable_texture'],
    hunyuan_3d_v3_text: [...refs, 'enable_texture'],
    kling_2p5_turbo_pro: ['aspect_ratio', 'duration_seconds', 'negative_prompt', 'video_batch_count', 'start_frame_image_media_token', 'image_media_token', 'end_frame_image_media_token', 'generate_audio', 'reference_image_media_tokens', 'reference_video_media_tokens', 'reference_audio_media_tokens', 'reference_character_tokens'],
  }[model.model] || [];
  for (const [key, value] of Object.entries(request)) {
    if (value != null && !common.includes(key) && !allowed.includes(key)) fail(400, `Unsupported parameter for ${model.model}: ${key}`);
  }
  if (request.enable_texture != null && typeof request.enable_texture !== 'boolean') fail(400, 'enable_texture must be boolean');
  if (request.negative_prompt != null && typeof request.negative_prompt !== 'string') fail(400, 'negative_prompt must be text');
}
