import { defineStore } from "pinia";
import { store } from "@/plugins/pinia";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
console.log(locale);

const useLocaleStore = defineStore("locales", {
  state: () => ({
    currentLocale: locale.value,
  }),
  getters: {
    getCurrentLocale(): string {
      return this.currentLocale;
    },
  },
  actions: {
    setCurrentLocale() {},
  },
});

const useLocaleStoreWithOut = () => {
  return useLocaleStore(store);
};

export { useLocaleStore, useLocaleStoreWithOut };
