import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupI18n } from "@/plugins/vue-i18n";

import { setupPinia } from "@/plugins/pinia";
import { setupTinyMCE } from "@/plugins/tinyMCE";

import { libElementPlus } from "@/plugins/element-plus";
import { libVeeValidate } from "@/plugins/vee-validate";
import { libVueQuery } from "@/plugins/vue-query";
import { libVueCountUp3 } from "@/plugins/vue-countup";
// import { libApexCharts } from "@/plugins/apex-charts";
import { libVueDraggableNext } from "@/plugins/vue-draggable-next";

// import { clickOutsideEvent } from "./directives";
// @ts-ignore
import App from "./App.vue";

import "@/assets/scss/main.scss";
import { clickOutside } from "@/directives";

const app = createApp(App);

async function setupAppAll() {
  // Setup I18n
  await setupI18n(app);
  // Setup Router
  await setupRouter(app);
  // Setup Store
  setupPinia(app);
  // Setup TinyMCE
  setupTinyMCE(app);
  // Setup Element Plus
  libElementPlus(app);

  // Setup VeeValidate
  libVeeValidate(app);
  // Setup Vue Query
  libVueQuery(app);
  // Setup  ApexCharts
  // libApexCharts(app);
  // Setup VueDraggableNext
  libVueDraggableNext(app);
  // Setup VueCountUp 3
  libVueCountUp3(app);

  // Directives
  app.directive("click-outside", clickOutside);
  app.mount("#app");
}

setupAppAll().catch((error) => {
  console.error("Error setting up the app:", error);
});
