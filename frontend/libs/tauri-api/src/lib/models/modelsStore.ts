// The Proxy listing controls model availability. Until it loads, selectors
// remain empty rather than offering models the Proxy cannot serve. Frontend
// overlays only enrich the returned models with display metadata.

import { create } from "zustand";
import {
  ImageModel,
  VideoModel,
  IMAGE_MODELS,
  VIDEO_MODELS,
  ALL_MODELS_LIST,
  buildImageModelsFromListing,
  buildVideoModelsFromListing,
} from "@storyteller/model-list";
import { ListImageModels } from "../generate/models/image/ListImageModels.js";
import { ListVideoModels } from "../generate/models/video/ListVideoModels.js";

export interface ModelsStoreState {
  imageModels: ImageModel[];
  videoModels: VideoModel[];
  // True once a backend reconciliation has completed at least once.
  loaded: boolean;
  isLoading: boolean;
  loadModelsFromBackend: () => Promise<void>;
}

export const useModelsStore = create<ModelsStoreState>((set, get) => ({
  imageModels: [],
  videoModels: [],
  loaded: false,
  isLoading: false,
  loadModelsFromBackend: async () => {
    if (get().isLoading) return;
    console.log("[models] loadModelsFromBackend() — calling Tauri commands…");
    set({ isLoading: true });

    const [imageResult, videoResult] = await Promise.allSettled([
      ListImageModels(),
      ListVideoModels(),
    ]);

    const next: Partial<ModelsStoreState> = { isLoading: false, loaded: true };

    if (imageResult.status === "fulfilled") {
      const { models, providers } = imageResult.value.payload;
      const offered = providers.flatMap((p) => p.models.map((pm) => pm.model));
      const built = buildImageModelsFromListing(IMAGE_MODELS, models, offered);
      next.imageModels = built;
      console.log(
        `[models] image: backend returned ${models.length} → ${built.length} models shown`,
        built.map((m) => m.tauriId),
      );
    } else {
      console.error("[models] failed to load image models from backend:", imageResult.reason);
    }

    if (videoResult.status === "fulfilled") {
      const { models, providers } = videoResult.value.payload;
      const offered = providers.flatMap((p) => p.models.map((pm) => pm.model));
      const built = buildVideoModelsFromListing(VIDEO_MODELS, models, offered);
      next.videoModels = built;
      console.log(
        `[models] video: backend returned ${models.length} → ${built.length} models shown`,
        built.map((m) => m.tauriId),
      );
    } else {
      console.error("[models] failed to load video models from backend:", videoResult.reason);
    }

    set(next);
  },
}));

// Hook selectors for React consumers.
export const useImageModels = (): ImageModel[] => useModelsStore((s) => s.imageModels);
export const useVideoModels = (): VideoModel[] => useModelsStore((s) => s.videoModels);

// History/recreate must consult the hydrated catalog too, not just the build's overlay.
export function findDesktopModel(modelId: string) {
  const { imageModels, videoModels } = useModelsStore.getState();
  return [...imageModels, ...videoModels, ...ALL_MODELS_LIST]
    .find((model) => model.tauriId === modelId || model.id === modelId);
}
