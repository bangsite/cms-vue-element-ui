import { nextTick, ref } from "vue";
import { i18n, loadLocaleMessages } from "@/plugins/vue-i18n";
import { ClientStorage, setHtmlLang } from "@/utils";
import type { LocaleType } from "@/types";

export const useLocale = () => {
  const currentLang = ref<LocaleType>(ClientStorage.load("__lang__") || "en");

  const setI18nLanguage = async (locale: LocaleType) => {
    if (i18n.mode === "legacy") {
      i18n.global.locale.value = locale;
    } else {
      if (!i18n.global.availableLocales.includes(locale)) {
        const messages = await loadLocaleMessages(locale);
        i18n.global.setLocaleMessage(locale, messages);
      }
      i18n.global.locale.value = locale;
    }

    ClientStorage.save("__lang__", locale);
    setHtmlLang(locale);

    currentLang.value = locale;
  };

  return {
    currentLang,
    setI18nLanguage,
  };
};
