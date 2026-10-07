import { GenerationProvider } from "@storyteller/api-enums";
import { ImageModel, VideoModel, Object3DModel, SplatModel, ModelCreator, ModelTag, buildImageModelsFromListing, buildVideoModelsFromListing } from "@storyteller/model-list";
import { enabled, proxyCall } from "./provider";

export async function mergeProxyCatalog(imageModels: ImageModel[], videoModels: VideoModel[]) {
  if (!enabled) return { imageModels, videoModels };
  const catalog = await proxyCall<{ protocol_version: number; models: Array<Record<string, any>> }>("capabilities");
  if (catalog.protocol_version !== 1) throw new Error("Unsupported fal Proxy protocol");
  const images = catalog.models.filter(m => m.modality === "image" && m.model !== "fal_birefnet");
  const videos = catalog.models.filter(m => m.modality === "video");
  const proxyImages = buildImageModelsFromListing([], images as any).map((m) => {
    const cap = images.find(c => c.model === m.tauriId)!;
    return new ImageModel({ ...m, providers: [GenerationProvider.FalProxy],
      maxGenerationCount: cap.batch_size_max ?? 1, defaultGenerationCount: 1,
      canTextToImage: cap.text_prompt_supported === true && !cap.mask_required,
      tags: cap.model === "nano_banana" ? [ModelTag.InstructiveEdit] : [],
      canEditImages: cap.model === "nano_banana" || cap.mask_required,
      canEditAngles: cap.angles, usesInpaintingMask: cap.mask_required,
      editingIsInpainting: cap.mask_required,
      canUseImagePrompt: cap.reference_limit > 0, maxImagePromptCount: cap.reference_limit,
    });
  });
  const proxyVideos = buildVideoModelsFromListing([], videos as any).map(m => new VideoModel({ ...m, providers: [GenerationProvider.FalProxy], supportsSystemPrompt: false }));
  return { imageModels: merge(imageModels, proxyImages), videoModels: merge(videoModels, proxyVideos) };
}

function merge<T extends ImageModel | VideoModel>(official: T[], proxy: T[]): T[] {
  const merged = official.map(model => {
    const variant = proxy.find(p => p.tauriId === model.tauriId);
    if (!variant) return model;
    const copy = Object.assign(Object.create(Object.getPrototypeOf(model)), model) as T;
    copy.registerProviderModel(GenerationProvider.FalProxy, variant, true);
    return copy;
  });
  return [...merged, ...proxy.filter(model => !official.some(o => o.tauriId === model.tauriId))];
}

// The original 3D selector consumes PopoverItems rather than the image catalog.
// Extend its items in place so the page and its editor callbacks stay shared.
export function extendProxy3DItems(items: any[], modality: "mesh" | "splat") {
  if (!enabled) return items;
  const specs = modality === "mesh" ? [
    ["hunyuan_3d_2p1", "Hunyuan 3D 2.1", "Image to textured mesh"],
    ["hunyuan_3d_v3_text", "Hunyuan 3D V3", "Text to textured mesh"],
  ] : [["tripo_splat", "TripoSplat", "Image to object Gaussian splat"]];
  const extra = specs.map(([id, name, description]) => {
    const source = items.find(item => item.model.tauriId === id);
    const ModelClass = modality === "mesh" ? Object3DModel : SplatModel;
    const proxy = new ModelClass({ id, tauriId: id, fullName: name, selectorName: name, selectorDescription: description,
      selectorBadges: [], category: modality === "mesh" ? "3d_object" : "gaussian", creator: ModelCreator.Fal,
      providers: [GenerationProvider.FalProxy] });
    if (source) {
      const clone = Object.assign(Object.create(Object.getPrototypeOf(source.model)), source.model);
      clone.registerProviderModel(GenerationProvider.FalProxy, proxy, true);
      return { ...source, model: clone };
    }
    return { label: name, description, model: proxy, modelConfig: proxy.toLegacyModelConfig() };
  });
  return [...extra, ...items.filter(item => !specs.some(([id]) => item.model.tauriId === id))];
}

export const backgroundRemovalModel = new ImageModel({
  id: "background_removal", tauriId: "fal_birefnet", fullName: "Background Removal", selectorName: "Background Removal",
  selectorDescription: "", selectorBadges: [], category: "image", creator: ModelCreator.Fal,
  providers: enabled ? [GenerationProvider.FalProxy, GenerationProvider.Artcraft] : [GenerationProvider.Artcraft],
  maxGenerationCount: 1, defaultGenerationCount: 1,
});
