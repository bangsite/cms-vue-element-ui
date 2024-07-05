import { defineStore } from "pinia";
import { store } from "@/plugins/pinia";

import type { LocaleState, LocaleType } from "@/types";
import { getDefaultLanguage } from "@/hooks/useLocale";
import { elLocaleMap, localeOptions } from "@/enums/locales.enum";

function createInitialState(): LocaleState {
  const defaultLanguage = getDefaultLanguage();
  return {
    currentLocale: {
      lang: defaultLanguage,
      elLocale: elLocaleMap[defaultLanguage],
    },
    localeMap: localeOptions,
  };
}

const useLocaleStore = defineStore("locales", {
  state: createInitialState,
  getters: {
    getCurrentLocale(state) {
      return state.currentLocale;
    },
    getLocaleMap(state) {
      return state.localeMap;
    },
  },
  actions: {
    setCurrentLocale(lang: LocaleType) {
      if (lang) {
        this.currentLocale.lang = lang;
        this.currentLocale.elLocale = elLocaleMap[lang];
        localStorage.setItem("lang", lang);
      }
    },
  },
});

const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};

export { useLocaleStore, useLocaleStoreWithOut };
