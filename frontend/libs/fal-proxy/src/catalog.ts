import { create } from "zustand";
import { GenerationProvider } from "@storyteller/api-enums";
import { ImageModel, VideoModel, Object3DModel, SplatModel, ModelCreator, ModelTag, buildImageModelsFromListing, buildVideoModelsFromListing, getCreatorListIcon } from "@storyteller/model-list";
import { enabled, proxyCall } from "./provider";
import type { ProxyPrice } from "./pricing";

export interface ProxyCatalogModel {
  model: string;
  full_name?: string;
  modality: "image" | "video" | "audio" | "mesh" | "splat" | "world" | "text";
  price?: ProxyPrice;
  reference_limit?: number;
  mask_required?: boolean;
  angles?: boolean;
  prompt_required?: boolean;
  [key: string]: unknown;
}

interface ProxyCatalogState {
  models: Record<string, ProxyCatalogModel>;
  loaded: boolean;
  setModels: (models: ProxyCatalogModel[]) => void;
}

/** Capabilities the Proxy advertised, keyed by model id. Pricing and page
 * copy read from here so a single fetch serves every surface. */
export const useProxyCatalog = create<ProxyCatalogState>((set) => ({
  models: {},
  loaded: false,
  setModels: (models) => set({ models: Object.fromEntries(models.map((m) => [m.model, m])), loaded: true }),
}));

export const getProxyModel = (id?: string | null): ProxyCatalogModel | undefined =>
  id ? useProxyCatalog.getState().models[id] : undefined;

export const useProxyModel = (id?: string | null): ProxyCatalogModel | undefined =>
  useProxyCatalog((s) => (id ? s.models[id] : undefined));

/** True when the model id is served by the Proxy for the given modality. */
export const isProxyModel = (id: string | undefined, modality?: ProxyCatalogModel["modality"]): boolean => {
  const model = getProxyModel(id);
  return !!model && (!modality || model.modality === modality);
};

export async function loadProxyCatalog(): Promise<ProxyCatalogModel[]> {
  const catalog = await proxyCall<{ protocol_version: number; models: ProxyCatalogModel[] }>("capabilities");
  if (catalog.protocol_version !== 1) throw new Error("Unsupported fal Proxy protocol");
  useProxyCatalog.getState().setModels(catalog.models);
  return catalog.models;
}

export async function mergeProxyCatalog(imageModels: ImageModel[], videoModels: VideoModel[]) {
  if (!enabled) return { imageModels, videoModels };
  const models = await loadProxyCatalog();
  const images = models.filter(m => m.modality === "image" && m.model !== "fal_birefnet");
  const videos = models.filter(m => m.modality === "video");
  const proxyImages = buildImageModelsFromListing([], images as any).map((m) => {
    const cap = images.find(c => c.model === m.tauriId)!;
    const official = imageModels.find(o => o.tauriId === m.tauriId);
    const instructive = cap.model.startsWith("nano_banana") || cap.model.startsWith("seedream_");
    return new ImageModel({ ...m, providers: [GenerationProvider.FalProxy],
      selectorName: official?.selectorName ?? m.selectorName,
      selectorDescription: official?.selectorDescription ?? m.selectorDescription,
      maxGenerationCount: (cap.batch_size_max as number | undefined) ?? 1, defaultGenerationCount: 1,
      canTextToImage: cap.text_prompt_supported === true && !cap.mask_required,
      tags: instructive ? [ModelTag.InstructiveEdit] : [],
      canEditImages: instructive || cap.mask_required === true,
      canEditAngles: cap.angles, usesInpaintingMask: cap.mask_required,
      editingIsInpainting: cap.mask_required,
      canUseImagePrompt: (cap.reference_limit ?? 0) > 0, maxImagePromptCount: cap.reference_limit,
    });
  });
  const proxyVideos = buildVideoModelsFromListing([], videos as any).map(m => {
    const official = videoModels.find(o => o.tauriId === m.tauriId);
    return new VideoModel({ ...m, providers: [GenerationProvider.FalProxy], supportsSystemPrompt: false,
      selectorName: official?.selectorName ?? m.selectorName, selectorDescription: official?.selectorDescription ?? m.selectorDescription });
  });
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

type ThreeDSpec = { id: string; name: string; description: string; badges?: string[] };
const MESH_SPECS: ThreeDSpec[] = [
  { id: "hunyuan_3d_3", name: "Hunyuan 3.0", description: "Highest quality 3D mesh generation" },
  { id: "hunyuan_3d_2p1", name: "Hunyuan 3D 2.1", description: "Image to textured mesh" },
  { id: "hunyuan_3d_v3_text", name: "Hunyuan 3D V3 Text", description: "Text to textured mesh" },
];
const WORLD_SPECS: ThreeDSpec[] = [
  { id: "tripo_splat", name: "TripoSplat", description: "Object Gaussian splat from one image", badges: ["PLY"] },
  { id: "hunyuan_world", name: "Hunyuan World", description: "World asset bundle from one image", badges: ["ZIP"] },
];

/** Copy shown instead of the upstream World Labs subtitle when a fal model is
 * selected on the 3D World page. Honest about what comes back. */
export const WORLD_PAGE_COPY: Record<string, { subtitle: string; action: string; note: string }> = {
  tripo_splat: {
    subtitle: "Turn one image into an object Gaussian splat with TripoSplat",
    action: "Generate splat",
    note: "TripoSplat returns a PLY splat of the pictured object. It is not an explorable World Labs world.",
  },
  hunyuan_world: {
    subtitle: "Build a layered world asset bundle from one image with Hunyuan World",
    action: "Generate bundle",
    note: "Hunyuan World returns a ZIP of scene layers for download. It is not an explorable World Labs world and does not open in the viewer.",
  },
};

// The original 3D selector consumes PopoverItems rather than the image catalog.
// Extend its items in place so the page and its editor callbacks stay shared.
export function extendProxy3DItems(items: any[], modality: "mesh" | "splat") {
  if (!enabled) return items;
  const specs = modality === "mesh" ? MESH_SPECS : WORLD_SPECS;
  const extra = specs.map(({ id, name, description, badges }) => {
    const source = items.find(item => item.model.tauriId === id);
    const ModelClass = modality === "mesh" ? Object3DModel : SplatModel;
    const proxy = new ModelClass({ id, tauriId: id, fullName: name, selectorName: name, selectorDescription: description,
      selectorBadges: badges ?? [], category: modality === "mesh" ? "3d_object" : "gaussian", creator: ModelCreator.Fal,
      providers: [GenerationProvider.FalProxy] });
    if (source) {
      const clone = Object.assign(Object.create(Object.getPrototypeOf(source.model)), source.model);
      clone.registerProviderModel(GenerationProvider.FalProxy, proxy, true);
      return { ...source, model: clone };
    }
    return { label: name, description, icon: getCreatorListIcon(ModelCreator.Fal), model: proxy, modelConfig: proxy.toLegacyModelConfig() };
  });
  return [...extra, ...items.filter(item => !specs.some(({ id }) => item.model.tauriId === id))];
}

export const backgroundRemovalModel = new ImageModel({
  id: "background_removal", tauriId: "fal_birefnet", fullName: "Background Removal", selectorName: "Background Removal",
  selectorDescription: "", selectorBadges: [], category: "image", creator: ModelCreator.Fal,
  providers: enabled ? [GenerationProvider.FalProxy, GenerationProvider.Artcraft] : [GenerationProvider.Artcraft],
  maxGenerationCount: 1, defaultGenerationCount: 1,
});
