import { ref } from "vue";
import { i18n, loadLocaleMessages } from "@/plugins/vue-i18n";
import { ClientStorage, setHtmlLang } from "@/utils";
import type { LocaleType } from "@/types";
import { useAppStore } from "@/stores/app.store";

export const useLocale = () => {
  const appStore = useAppStore();
  const currentLang = ref<LocaleType>(ClientStorage.load("__lang__") || i18n.global?.locale?.value);

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
    appStore.setLocale(locale);
    currentLang.value = locale;
  };

  return {
    currentLang,
    setI18nLanguage,
  };
};
