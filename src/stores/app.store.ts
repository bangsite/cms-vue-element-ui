import { defineStore } from "pinia";
import { store } from "@/plugins/pinia";
import type { Layouts } from "@/types";

interface App {
  collapse: boolean;
  footer: boolean;
  locale: boolean;
  layout: Layouts;
  logo: boolean;
  dark: boolean;
  title: string;
  userInfo: string;
  fullScreen: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): App => {
    return <App>{
      collapse: false,
      footer: true,
      layout: localStorage.getItem("layout") || "classic",
      locale: true,
      logo: true, // logo
      title: import.meta.env.VITE_APP_TITLE,
      userInfo: "userInfo",
      fullScreen: true,
      dark: false,
    };
  },
  getters: {
    getIsDark(): boolean {
      return this.dark;
    },
    getCollapse(): boolean {
      return this.collapse;
    },
    getLayout(): Layouts {
      return this.layout;
    },
    getLocale(): boolean {
      return this.locale;
    },
    getLogo(): boolean {
      return this.logo;
    },
    getTitle(): string {
      return this.title;
    },
    getUserInfo(): string {
      return this.userInfo;
    },
    getFooter(): boolean {
      return this.footer;
    },
    getFullScreen(): boolean {
      return this.fullScreen;
    },
  },
  actions: {
    setIsDark(val: boolean) {
      this.dark = val;
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse;
    },

    setFooter(footer: boolean) {
      this.footer = footer;
    },
    setLayout(layout: Layouts) {
      this.layout = layout;
      localStorage.setItem("layout", this.layout);
    },
    setLocale(locale: boolean) {
      this.locale = locale;
    },
    setLogo(logo: boolean) {
      this.logo = logo;
    },

    setTitle(title: string) {
      this.title = title;
    },

    setFullScreen(fullScreen: boolean) {
      this.fullScreen = fullScreen;
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
