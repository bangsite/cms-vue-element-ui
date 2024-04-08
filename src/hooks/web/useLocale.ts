import { i18n } from "@/plugins/i18n";
import { useLocaleStoreWithOut } from "@/stores/locale.store";
import { setHtmlPageLang } from "@/utils/setHtmlPageLang";

const setI18nLanguage = (locale: LocaleType) => {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale = locale;
  }

  localeStore.setCurrentLocale({
    lang: locale,
  });

  setHtmlPageLang(locale);
};

const useLocale = () => {
  const changeLocale = async (locale: LocaleType) => {
    const globalI18n = i18n.global;
    const langModule = await import(`../../locales/${locale}/index.ts`);

    globalI18n.setLocaleMessage(locale, langModule.default);
    setI18nLanguage(locale);
  };

  return {
    changeLocale,
  };
};

export { useLocale };
