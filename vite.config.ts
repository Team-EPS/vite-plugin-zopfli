import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
    })
  ],
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ViteZopfliCompressor",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["node:fs", "node:path", "node-zopfli"],
      treeshake: "recommended",
      output: {
        globals: {
          "node:fs": "fs",
          "node:path": "p",
          "node-zopfli": "zopfli"
        }
      }
    }
  }
})
