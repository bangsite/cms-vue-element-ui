import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // VueDevTools(),
    VueI18nPlugin({
      runtimeOnly: false,
      // include: resolve(dirname(fileURLToPath(import.meta.url)), "./src/locales/**"),
    }),
    visualizer({
      open: true, // Automatically open in browser
      filename: "bundle-analysis.html", // File to output the analysis
      // emitFile: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id.split("node_modules")[1].split("/")[1].toString();
          }
        },
      },
    },
  },
  // server: {
  //   proxy: {
  //     "^/api": {
  //       target: "api.openweathermap.org",
  //       ws: true,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
