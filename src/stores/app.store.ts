import { defineStore } from "pinia";

import { store } from "@/plugins/pinia";

import type { LayoutType } from "@/types/layout";

interface AppState {
  collapse: boolean;
  footer: boolean;
  locale: boolean;
  layout: LayoutType;
  logo: boolean;
  dark: boolean;
  title: string;
  userInfo: string;
  fullScreen: boolean;
  pageLoading: boolean;
  size: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return <AppState>{
      collapse: false,
      footer: true,
      layout: localStorage.getItem("layout") || "classic",
      locale: true,
      logo: true, // logo

      title: import.meta.env.VITE_APP_TITLE,
      userInfo: "userInfo",
      fullScreen: true,
      pageLoading: false,
      size: true,
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
    getLayout(): LayoutType {
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
    getSize(): boolean {
      return this.size;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
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
    setLayout(layout: LayoutType) {
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
    setSize(size: boolean) {
      this.size = size;
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading;
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
