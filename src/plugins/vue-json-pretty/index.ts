import type { App } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export function libVueJsonPretty(app: App<Element>) {
  app.component("vue-json-pretty", VueJsonPretty);
}
