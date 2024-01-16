import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: { input: path.join(__dirname, "electron/preload.ts") },
      renderer: {},
    }),
  ],
});
