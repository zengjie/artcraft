import { MODELS } from './models.mjs';

// Versioned extension contract; not the upstream ArtCraft billing/model API.
export function capabilities() {
  return {
    success: true, protocol_version: 1, provider: 'fal_proxy',
    billing: { provider: 'fal', currency: 'USD', estimate_available: false },
    models: MODELS.map(({ endpoint, hidden, ...model }) => ({
      ...model,
      reference_limit: model.model === 'hunyuan_3d_v3_text' ? 0 : model.model === 'flux_pro_1' || model.model === 'fal_birefnet' || model.modality === 'mesh' || model.model === 'qwen_edit_2511_angles' ? 1 : model.image_refs_max || (model.modality === 'video' ? 1 : 0),
      mask_required: model.model === 'flux_pro_1',
      angles: model.model === 'qwen_edit_2511_angles',
      prompt_required: model.text_prompt_supported === true,
    })),
    unsupported: [
      { capability: 'marble', reason: '提供 TripoSplat 和 Hunyuan World；它们并非 Marble，也不保证相同输出或质量。原版 Marble 请主动选择官方服务。' },
      { capability: 'watermark_removal', reason: '上游入口是占位实现，当前扩展不提供此功能。' },
      { capability: 'automatic_prompt_enhancement', reason: '视频提示词生成是独立付费任务，结果可手动应用；原版自动增强开关尚未连接。' },
    ],
  };
}
