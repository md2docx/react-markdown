import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    coverage: {
      include: ["src/**"],
      exclude: [
        "src/**/index.ts",
        "src/**/*.test.*",
        "src/**/declaration.d.ts",
        "src/test-utils.ts",
      ],
      reporter: ["text", "json", "clover", "html"],
    },
  },
});
