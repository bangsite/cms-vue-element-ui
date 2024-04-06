import type { App } from "vue";
import { createI18n } from "vue-i18n";
import type { I18nOptions } from "vue-i18n";

import { useLocaleStoreWithOut } from "@/stores/locale.store";
import { setHtmlPageLang } from "@/utils/setHtmlPageLang";

// export let i18n: ReturnType<typeof createI18n>;

const createI18nOptions = async (): Promise<I18nOptions> => {
  const localeStore = useLocaleStoreWithOut();
  const locale = localeStore.getCurrentLocale;
  const localeMap = localeStore.getLocaleMap;
  const defaultLocal = await import(`../../locales/${locale.lang}/index.ts`);

  const message = defaultLocal.default ?? {};

  setHtmlPageLang(locale.lang);

  localeStore.setCurrentLocale({
    lang: locale.lang,
    // elLocale: elLocal
  });

  return {
    locale: locale.lang,
    fallbackLocale: locale.lang,
    allowComposition: true,
    messages: {
      [locale.lang]: message,
    },
    availableLocales: localeMap.map((v) => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
};

const options = await createI18nOptions();

export const i18n = createI18n(options);

// setup i18n instance with glob
export const setupI18n = async (app: App<Element>) => {
  // i18n = createI18n(options);
  app.use(i18n);
};
