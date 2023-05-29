import { defineStore } from "pinia";
import { store } from "@/plugins/pinia";
import { useCache } from "@/hooks/web/useCache";

import en from "element-plus/es/locale/lang/en";
import vi from "element-plus/es/locale/lang/vi";
import ja from "element-plus/es/locale//lang/ja";

import type { LocaleDropdownType, LocaleState } from "@/core/interfaces/locale.interface";

const { wsCache } = useCache();
const elLocaleMap = {
    en: en,
    ja: ja,
    vi: vi,
};

const useLocaleStore = defineStore("locales", {
    state: (): LocaleState => {
        return {
            currentLocale: {
                lang: wsCache.getItem("lang") || "en",
                elLocale: elLocaleMap[(wsCache.getItem("lang") as LocaleType) || "en"],
            },
            localeMap: [
                {
                    lang: "en",
                    name: "English",
                },
                {
                    lang: "vi",
                    name: "VietNam",
                },
            ],
        };
    },
    getters: {
        getCurrentLocale(): LocaleDropdownType {
            return this.currentLocale;
        },
        getLocaleMap(): LocaleDropdownType[] {
            return this.localeMap;
        },
    },
    actions: {
        setCurrentLocale(localeMap: LocaleDropdownType) {
            // this.locale = Object.assign(this.locale, localeMap)
            this.currentLocale.lang = localeMap?.lang;
            this.currentLocale.elLocale = elLocaleMap[localeMap?.lang];
            wsCache.setItem("lang", localeMap?.lang);
        },
    },
});

const useLocaleStoreWithOut = () => {
    return useLocaleStore(store);
};

export { useLocaleStore, useLocaleStoreWithOut };
