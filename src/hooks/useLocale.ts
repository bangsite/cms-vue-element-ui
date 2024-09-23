import { ref, toRef } from "vue";
import { i18n } from "@/plugins/vue-i18n";
import { ClientStorage, setHtmlLang } from "@/utils";
import { languages } from "@/enums/locales.enum";
import type { LocaleType } from "@/types";

export const useLocale = () => {
  const currentLang = ref<LocaleType>(ClientStorage.load("__lang__") || "en");

  const getLanguage = (currentLang: LocaleType) => {
    return languages[currentLang] || languages.en;
  };

  const setI18nLanguage = (locale: LocaleType) => {
    if (i18n.mode === "legacy") {
      i18n.global.locale = locale;
    } else {
      i18n.global.locale = locale;
    }

    ClientStorage.save("__lang__", locale);

    setHtmlLang(locale);
  };

  return {
    currentLang,
    getLanguage,
    setI18nLanguage,
  };
};
