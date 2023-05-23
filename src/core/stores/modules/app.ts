import { defineStore } from "pinia";
import { useCache } from "@/hooks/web/useCache";
import { type LayoutType } from "@/core/types/layout";
import { store } from "@/plugins/pinia";
import { ElMessage } from "element-plus";

const { wsCache } = useCache();

interface AppState {
  breadcrumb: boolean;
  //   breadcrumbIcon: boolean;
  //   collapse: boolean;
  //   uniqueOpened: boolean;
  //   hamburger: boolean;
  //   screenfull: boolean;
  //   size: boolean;
  locale: boolean;
  //   tagsView: boolean;
  //   tagsViewIcon: boolean;
  //   logo: boolean;
  //   fixedHeader: boolean;
  //   greyMode: boolean;
  //   dynamicRouter: boolean;
  pageLoading: boolean;
  layout: LayoutType;
  title: string;
  userInfo: string;
  isDark: boolean;
  //   currentSize: ElementPlusSize;
  //   sizeMap: ElementPlusSize[];
  mobile: boolean;
  footer: boolean;
  //   theme: ThemeTypes;
  //   fixedMenu: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      breadcrumb: true,
      footer: true,
      locale: true,
      layout: wsCache.getItem("layout") || "classic",
      isDark: wsCache.getItem("isDark") || false,
      mobile: false,
      title: import.meta.env.VITE_APP_TITLE,
      pageLoading: false,
      userInfo: "userInfo",
    };
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb;
    },
    getLayout(): LayoutType {
      return this.layout;
    },
    getIsDark(): boolean {
      return this.isDark;
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
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb;
    },
    setLocale(locale: boolean) {
      this.locale = locale;
    },
    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== "classic") {
        ElMessage.warning("Switching to other layouts is not supported in mobile mode");
        return;
      }
      this.layout = layout;
      wsCache.setItem("layout", this.layout);
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark;
      if (this.isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
      wsCache.setItem("isDark", this.isDark);
    },
    setTitle(title: string) {
      this.title = title;
    },
    setFooter(footer: boolean) {
      this.footer = footer;
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
