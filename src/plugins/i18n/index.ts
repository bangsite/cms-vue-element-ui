import type { App } from "vue";
import { createI18n } from "vue-i18n";
import english from "@/locales/en";
import japan from "@/locales/ja";

const messages = {
  en: { ...english },
  ja: { ...japan },
};

export const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: import.meta.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages,
});

// setup i18n instance with glob
export const setupI18n = (app: App) => {
  app.use(i18n);
};
