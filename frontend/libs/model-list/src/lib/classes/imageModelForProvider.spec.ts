// @vitest-environment jsdom
import { expect, it } from "vitest";
import { GenerationProvider } from "@storyteller/api-enums";
import { buildImageModelsFromListing } from "../loader/buildModelsFromListing.js";
import { imageModelForProvider } from "./imageModelForProvider.js";

it("switches Midjourney capabilities without changing the ArtCraft catalog model", () => {
  const [model] = buildImageModelsFromListing([], [{
    model: "midjourney_8", batch_size_options: [1, 2, 4], batch_size_default: 1,
    image_refs_supported: true, image_refs_max: 4,
    resolution_options: ["two_k"], quality_options: ["high"],
  }]);
  const direct = imageModelForProvider(model, GenerationProvider.Midjourney)!;
  expect(direct.getProviders()).toEqual([GenerationProvider.Artcraft, GenerationProvider.Midjourney]);
  expect(direct.predefinedGenerationCounts).toEqual([4]);
  expect(direct.defaultGenerationCount).toBe(4);
  expect(direct.isValidGenerationCount(1)).toBe(false);
  expect(direct.canUseImagePrompt).toBe(false);
  expect(direct.supportsNewResolution()).toBe(false);
  expect(direct.supportsQuality()).toBe(false);
  expect(imageModelForProvider(model, GenerationProvider.Artcraft)).toBe(model);
  expect(model.canUseImagePrompt).toBe(true);
  expect(model.predefinedGenerationCounts).toEqual([1, 2, 4]);
});

it("keeps official capabilities and identity when adding a preferred provider", () => {
  const [official] = buildImageModelsFromListing([], [{ model: "nano_banana", image_refs_supported: true, image_refs_max: 14, resolution_options: ["two_k"], batch_size_max: 8 }]);
  const [proxy] = buildImageModelsFromListing([], [{ model: "nano_banana", image_refs_supported: true, image_refs_max: 8, resolution_options: [], batch_size_max: 4 }]);
  official.registerProviderModel(GenerationProvider.FalProxy, proxy, true);
  expect(official.getProviders()).toEqual([GenerationProvider.FalProxy, GenerationProvider.Artcraft]);
  expect(imageModelForProvider(official, GenerationProvider.Artcraft)).toBe(official);
  expect(official.maxImagePromptCount).toBe(14);
  expect(imageModelForProvider(official, GenerationProvider.FalProxy)?.maxImagePromptCount).toBe(8);
  expect(imageModelForProvider(official, GenerationProvider.FalProxy)?.resolutions).toEqual([]);
  expect(imageModelForProvider(official, GenerationProvider.Artcraft)?.resolutions).toEqual(["two_k"]);
});
