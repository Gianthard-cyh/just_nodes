import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    eslintPlugin({
      include: ["src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
    Unocss()
  ],
});
