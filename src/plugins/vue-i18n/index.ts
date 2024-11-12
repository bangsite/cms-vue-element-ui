import type { App } from "vue";
import { createI18n, type I18nOptions } from "vue-i18n";
import { ClientStorage, setHtmlLang } from "@/utils";
import { langCurrency, langOptions } from "@/enums/locales.enum";
import type { LocaleType } from "@/types";

export async function loadLocaleMessages(locale: string) {
  if (locale) {
    debugger;
    const messages = await import(`../../locales/${locale}/index.ts`);
    return messages.default || {};
  }
}

async function createI18nOptions(): Promise<I18nOptions> {
  const currentLang: LocaleType = ClientStorage.load("__lang__") || "en";
  const message = await loadLocaleMessages(currentLang);

  setHtmlLang(currentLang);

  return {
    legacy: false,
    locale: currentLang,
    fallbackLocale: currentLang,
    allowComposition: true,
    messages: { [currentLang]: message },
    numberFormats: {
      ...langCurrency,
    },
    availableLocales: langOptions.map((v) => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
    globalInjection: true,
  };
}

const i18nOptions = await createI18nOptions();
export const i18n = createI18n({ ...i18nOptions });

// setup i18n instance with glob
export async function setupI18n(app: App) {
  app.use(i18n);
}
