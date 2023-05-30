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
  breadcrumbIcon: boolean;
  collapse: boolean;
  currentSize: ElementPlusSize;
  //   dynamicRouter: boolean;
  fixedMenu: boolean;
  fixedHeader: boolean;
  footer: boolean;
  hamburger: boolean;
  locale: boolean;
  logo: boolean;
  greyMode: boolean;
  mobile: boolean;
  pageLoading: boolean;
  layout: LayoutType;
  title: string;
  userInfo: string;
  isDark: boolean;
  theme: ThemeTypes;
  tagsView: boolean;
  tagsViewIcon: boolean;
  //   uniqueOpened: boolean;
  screenFull: boolean;
  sizeMap: ElementPlusSize[];
  size: boolean;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      breadcrumb: true,
      breadcrumbIcon: true,
      collapse: false,
      currentSize: wsCache.getItem("default") || "default", // Component size
      fixedHeader: true, // Fixed tool header
      fixedMenu: wsCache.getItem("fixedMenu") || false, // Whether to fix the menu
      footer: true,
      isDark: wsCache.getItem("isDark") || false,
      hamburger: true,
      layout: wsCache.getItem("layout") || "classic",
      locale: true,
      logo: true, // logo
      mobile: false,
      greyMode: false, // Whether to start the gray mode for special mourning days
      tagsView: true, // Bookmark page
      tagsViewIcon: true, // Whether to display the label icon
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
      title: import.meta.env.VITE_APP_TITLE,
      pageLoading: false,
      userInfo: "userInfo",
      screenFull: true,
      size: true,
      sizeMap: ["default", "large", "small"],
    };
  },
  getters: {
    getBreadcrumb(): boolean {
      return this.breadcrumb;
    },
    getBreadcrumbIcon(): boolean {
      return this.breadcrumbIcon;
    },
    getCollapse(): boolean {
      return this.collapse;
    },
    getCurrentSize(): ElementPlusSize {
      return this.currentSize;
    },
    getFixedMenu(): boolean {
      return this.fixedMenu;
    },
    getFixedHeader(): boolean {
      return this.fixedHeader;
    },
    getGreyMode(): boolean {
      return this.greyMode;
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
    getIsDark(): boolean {
      return this.isDark;
    },
    getHamburger(): boolean {
      return this.hamburger;
    },
    getMobile(): boolean {
      return this.mobile;
    },
    getTagsView(): boolean {
      return this.tagsView;
    },
    getTagsViewIcon(): boolean {
      return this.tagsViewIcon;
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
    getScreenFull(): boolean {
      return this.screenFull;
    },
    getSize(): boolean {
      return this.size;
    },
    getPageLoading(): boolean {
      return this.pageLoading;
    },
  },
  actions: {
    setBreadcrumb(breadcrumb: boolean) {
      this.breadcrumb = breadcrumb;
    },
    setBreadcrumbIcon(breadcrumbIcon: boolean) {
      this.breadcrumbIcon = breadcrumbIcon;
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse;
    },
    setCurrentSize(currentSize: ElementPlusSize) {
      this.currentSize = currentSize;
      wsCache.setItem("currentSize", this.currentSize);
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, (this.theme as Record<string, string | null>)[key]);
      }
    },
    setFixedHeader(fixedHeader: boolean) {
      this.fixedHeader = fixedHeader;
    },
    setFixedMenu(fixedMenu: boolean) {
      wsCache.setItem("fixedMenu", fixedMenu);
      this.fixedMenu = fixedMenu;
    },
    setFooter(footer: boolean) {
      this.footer = footer;
    },
    setGreyMode(greyMode: boolean) {
      this.greyMode = greyMode;
    },
    setHamburger(hamburger: boolean) {
      this.hamburger = hamburger;
    },

    setLayout(layout: LayoutType) {
      if (this.mobile && layout !== "classic") {
        ElMessage.warning("Switching to other layouts is not supported in mobile mode");
        return;
      }
      this.layout = layout;
      wsCache.setItem("layout", this.layout);
    },
    setLocale(locale: boolean) {
      this.locale = locale;
    },
    setLogo(logo: boolean) {
      this.logo = logo;
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
    setTagsView(tagsView: boolean) {
      this.tagsView = tagsView;
    },
    setTagsViewIcon(tagsViewIcon: boolean) {
      this.tagsViewIcon = tagsViewIcon;
    },
    setTitle(title: string) {
      this.title = title;
    },

    setScreenFull(screenFull: boolean) {
      this.screenFull = screenFull;
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
