import { defineConfig } from "vite"
import ViteZopfliCompressor from "./src/plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ViteZopfliCompressor({
      deleteOriginalAssets: true,
    })
  ]
})
