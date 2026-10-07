import {
  IMAGE_MODELS_BY_ID,
  Model,
  SPLAT_MODELS_BY_ID,
  VIDEO_MODELS_BY_ID,
} from "@storyteller/model-list";
import { ModelPage } from "./model-pages";

const DEFAULT_MODEL_ID_FOR_PAGE: Partial<Record<ModelPage, string>> = {
  [ModelPage.TextToImage]: "nano_banana_pro",
  [ModelPage.ImageToVideo]: "seedance_2p0",
  [ModelPage.Canvas2D]: "gpt_image_1p5",
  [ModelPage.Stage3D]: "gpt_image_1p5",
  [ModelPage.ImageEditor]: "nano_banana_pro",
  [ModelPage.ImageTo3DWorld]: "marble_0p1_mini",
  [ModelPage.Angles]: "flux_2_lora_angles",
};

// When the team fal account serves a page, start from these models: the
// upstream default where fal carries it, otherwise the cheapest capable fal
// model. Explicit user choices still win over this table.
const FAL_DEFAULT_MODEL_ID_FOR_PAGE: Partial<Record<ModelPage, string>> = {
  [ModelPage.TextToImage]: "nano_banana_pro",
  [ModelPage.ImageToVideo]: "kling_2p5_turbo_pro",
  [ModelPage.Canvas2D]: "nano_banana",
  [ModelPage.Stage3D]: "nano_banana",
  [ModelPage.ImageEditor]: "nano_banana_pro",
  [ModelPage.ImageTo3DWorld]: "tripo_splat",
  [ModelPage.ImageTo3DObject]: "hunyuan_3d_3",
  [ModelPage.Angles]: "qwen_edit_2511_angles",
  [ModelPage.BackgroundRemoval]: "fal_birefnet",
};

const servedByFal = (model: Model): boolean =>
  model.getPreferredProvider() === "fal_proxy" || model.getProviders()[0] === "fal_proxy";

export const defaultModelForPage = (
  models: Model[],
  page: ModelPage,
): Model => {
  const falId = FAL_DEFAULT_MODEL_ID_FOR_PAGE[page];
  const falDefault = models.find((m) => (m.id === falId || m.tauriId === falId) && servedByFal(m));
  if (falDefault) return falDefault;
  const preferred = models.find(servedByFal);
  if (preferred) return preferred;
  const defaultId = DEFAULT_MODEL_ID_FOR_PAGE[page];

  if (defaultId) {
    // Prefer the instance from the caller's (backend-hydrated) list — the
    // static map instances are presentation-only fallbacks without the API's
    // capability data.
    const fromList = models.find(
      (m) => m.id === defaultId || m.tauriId === defaultId,
    );
    if (fromList) return fromList;

    const fromStaticMaps =
      IMAGE_MODELS_BY_ID.get(defaultId) ??
      VIDEO_MODELS_BY_ID.get(defaultId) ??
      SPLAT_MODELS_BY_ID.get(defaultId);
    if (fromStaticMaps) return fromStaticMaps;
  }

  return models[0];
};
