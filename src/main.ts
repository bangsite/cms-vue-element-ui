import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupI18n } from "@/plugins/i18n";

import { libPinia } from "@/plugins/pinia";
import { libElementPlus } from "@/plugins/element-plus";
import { libVeeValidate } from "@/plugins/vee-validate";
import { libVueQuery } from "@/plugins/vue-query";
import { libApexCharts } from "@/plugins/chart";

// @ts-ignore
import App from "./App.vue";

import "@/assets/scss/main.scss";

const app = createApp(App);

async function setupPlugins() {
  // Setup AntDesign
  libElementPlus(app);

  // Setup VeeValidate
  libVeeValidate(app);

  // Setup Vue Query
  libVueQuery(app);

  // Setup  ApexCharts
  libApexCharts(app);
}

async function setupApp() {
  // Setup Store
  libPinia(app);

  // Setup Router
  await setupRouter(app);

  // Setup I18n
  await setupI18n(app);

  app.mount("#app");
}

setupPlugins().then((r) => console.log(r));

setupApp().then((r) => console.log(r));
