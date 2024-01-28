import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import ts from "typescript";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: {},
    }),
    transformTypeScriptPlugin({
      input: [path.join(__dirname, "electron/widget-preload.ts")],
      output: path.join(__dirname, "dist-electron"),
    }),
  ],
  build: {
    rollupOptions: {
      external: ["swd"],
    },
  },
});

function transformTypeScriptPlugin(params: {
  input: Array<string>;
  output: string;
}) {
  return {
    name: "transform-ts",
    configureServer(server) {
      params.input.map((item) => {
        server.watcher.add(item);
      });

      // Debug
      // server.watcher.on("change", async (file) => {
      // console.log(`File ${file} changed`);
      // });
    },
    handleHotUpdate() {
      if (params.input.length === 0) return;

      params.input.map((filepath) => {
        if (!filepath.endsWith(".ts")) return;

        const isExist = existsSync(filepath);

        if (!isExist) {
          console.warn("File not avaible - ", path);
          return;
        }

        const code: string = readFileSync(filepath, "utf-8");

        const result = ts.transpileModule(code, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS,
          },
        });

        if (!existsSync(params.output)) {
          mkdirSync(params.output, { recursive: true });
        }

        const outputFilePath = path.join(
          params.output,
          path.basename(filepath).replace(".ts", ".js")
        );
        writeFileSync(outputFilePath, result.outputText);
      });
    },
  };
}
