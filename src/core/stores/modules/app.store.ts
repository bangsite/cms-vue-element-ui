import { defineStore } from "pinia";
import { ElMessage } from "element-plus";

import { store } from "@/plugins/pinia";

import type { LayoutType } from "@/types/layout";
import type { ThemeTypes } from "@/types/theme";
import type { ElementPlusSize } from "@/types/elementPlus";

import { useCache } from "@/hooks/web/useCache";

import { setCssVar } from "@/shared/utils/setCssVar";
import { humpToUnderline } from "@/shared/utils/humpToUnderline";

const { wsCache } = useCache();

interface AppState {
  breadcrumb: boolean;
  //   breadcrumbIcon: boolean;
  collapse: boolean;
  currentSize: ElementPlusSize;

  //   uniqueOpened: boolean;
  //   hamburger: boolean;
  //   screenfull: boolean;
  //   size: boolean;
  locale: boolean;
  //   tagsView: boolean;
  //   tagsViewIcon: boolean;
  //   logo: boolean;
  //   fixedHeader: boolean;
  greyMode: boolean;
  //   dynamicRouter: boolean;
  pageLoading: boolean;
  layout: LayoutType;
  title: string;
  userInfo: string;
  isDark: boolean;
  //   sizeMap: ElementPlusSize[];
  mobile: boolean;
  footer: boolean;
  theme: ThemeTypes;
  //   fixedMenu: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      breadcrumb: true,
      collapse: false,
      currentSize: wsCache.getItem("default") || "default", // Component size
      footer: true,
      greyMode: false, // Whether to start the gray mode for special mourning days
      locale: true,
      layout: wsCache.getItem("layout") || "classic",
      isDark: wsCache.getItem("isDark") || false,
      mobile: false,
      title: import.meta.env.VITE_APP_TITLE,
      pageLoading: false,
      userInfo: "userInfo",
      theme: wsCache.getItem("theme") || {
        // Theme color
        elColorPrimary: "#409eff",
        // Left menu border color
        leftMenuBorderColor: "inherit",
        // Left menu background color
        leftMenuBgColor: "#001529",
        // Left menu light background color
        leftMenuBgLightColor: "#0f2438",
        // Left menu selection background color
        leftMenuBgActiveColor: "var(--el-color-primary)",
        // The left menu collapses and selects the background color
        leftMenuCollapseBgActiveColor: "var(--el-color-primary)",
        // Left menu font color
        leftMenuTextColor: "#bfcbd9",
        // Left menu selection font color
        leftMenuTextActiveColor: "#fff",
        // Logo font color
        logoTitleTextColor: "#fff",
        // Logo border color
        logoBorderColor: "inherit",
        // Head background color
        topHeaderBgColor: "#fff",
        // Header font color
        topHeaderTextColor: "inherit",
        // Header hover color
        topHeaderHoverColor: "#f6f6f6",
        // Header border color
        topToolBorderColor: "#eee",
      },
    };
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb;
    },
    getCollapse(): boolean {
      return this.collapse;
    },
    getCurrentSize(): ElementPlusSize {
      return this.currentSize;
    },
    getGreyMode(): boolean {
      return this.greyMode;
    },
    getLayout(): LayoutType {
      return this.layout;
    },
    getIsDark(): boolean {
      return this.isDark;
    },
    getMobile(): boolean {
      return this.mobile;
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
    setCollapse(collapse: boolean) {
      this.collapse = collapse;
    },
    setCurrentSize(currentSize: ElementPlusSize) {
      this.currentSize = currentSize;
      wsCache.setItem("currentSize", this.currentSize);
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode;
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
    setMobile(mobile: boolean) {
      this.mobile = mobile;
    },
    setTitle(title: string) {
      this.title = title;
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, (this.theme as Record<string, string | null>)[key]);
      }
    },
    setFooter(footer: boolean) {
      this.footer = footer;
    },
  },
});

export const useAppStoreWithOut = () => {
  return useAppStore(store);
};
