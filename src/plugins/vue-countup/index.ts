import type { App } from "vue";
import CountUp from "vue-countup-v3";

export function libVueCountUp3(app: App<Element>) {
  app.component("VueCountUp", CountUp);
}
