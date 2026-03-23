import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        openSource: resolve(rootDir, "open-source/index.html"),
        verba: resolve(rootDir, "labs/verba/index.html"),
        verbaCaseStudy: resolve(rootDir, "labs/verba/case-study/index.html"),
        verbaWorkspace: resolve(rootDir, "labs/verba/workspace/index.html"),
        voiceWorkspace: resolve(rootDir, "labs/voice-workspace/index.html")
      }
    }
  }
});
