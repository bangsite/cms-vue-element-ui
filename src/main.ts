import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupI18n } from "@/plugins/i18n";

import { setupPinia } from "@/plugins/pinia";
import { setupTinyMCE } from "@/plugins/tinyMCE";

import { libElementPlus } from "@/plugins/element-plus";
import { libVeeValidate } from "@/plugins/vee-validate";
import { libVueQuery } from "@/plugins/vue-query";
// import { libApexCharts } from "@/plugins/apex-charts";
import { libVueDraggableNext } from "@/plugins/vue-draggable-next";

// @ts-ignore
import App from "./App.vue";

import "@/assets/scss/main.scss";

const app = createApp(App);

async function setupAppAll() {
  // Setup I18n
  await setupI18n(app);

  // Setup Store
  setupPinia(app);

  // Setup TinyMCE
  setupTinyMCE(app);

  // Setup Router
  await setupRouter(app);

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

  app.mount("#app");
}

setupAppAll();
