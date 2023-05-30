import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupI18n } from "@/plugins/i18n";

import { setupPinia } from "@/plugins/pinia";
import { libElementPlus } from "@/plugins/element-plus";
import { libVeeValidate } from "@/plugins/vee-validate";
import { libVueQuery } from "@/plugins/vue-query";
// import { libApexCharts } from "@/plugins/chart";

import App from "./App.vue";

import "@/assets/scss/main.scss";

const app = createApp(App);

async function setupAppAll() {
  // Setup AntDesign
  libElementPlus(app);

  // Setup VeeValidate
  libVeeValidate(app);

  // Setup Vue Query
  libVueQuery(app);

  // Setup  ApexCharts
  // libApexCharts(app);

  // Setup I18n
  await setupI18n(app);

  // Setup Store
  setupPinia(app);

  // Setup Router
  await setupRouter(app);

  app.mount("#app");
}

setupAppAll();
