import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "../.."),
  plugins: [tsconfigPaths({ projects: [path.resolve(__dirname, "../../tsconfig.base.json")] })],
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    include: [
      "libs/model-list/src/lib/classes/imageModelForProvider.spec.ts",
      "libs/model-list/src/lib/loader/buildModelsFromListing.spec.ts",
      "libs/components/model-selector/src/lib/classy-model-selector-store.spec.ts",
      "libs/fal-proxy/src/**/*.spec.ts",
    ],
  },
});
