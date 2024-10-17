import { ref } from "vue";
import { i18n } from "@/plugins/vue-i18n";
import { ClientStorage, setHtmlLang } from "@/utils";
import type { LocaleType } from "@/types";

export const useLocale = () => {
  const currentLang = ref<LocaleType>(ClientStorage.load("__lang__") || "en-US");

  const getLang = () => currentLang.value;

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
    getLang,
    setI18nLanguage,
  };
};
