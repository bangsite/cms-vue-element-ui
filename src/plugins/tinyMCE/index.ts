import type { App } from "vue";
import Editor from "@tinymce/tinymce-vue";

export function setupTinyMCE(app: App) {
  app.use(Editor);
}
