import type { App } from "vue";
import { createPinia } from "pinia";

export function libPinia(app: App<Element>) {
  app.use(createPinia());
}
