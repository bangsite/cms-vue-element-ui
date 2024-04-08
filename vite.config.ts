import { fileURLToPath, URL } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: "./environments",
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: false,
      // include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/locales/**"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  build: {
    target: "esnext",
  },
});
