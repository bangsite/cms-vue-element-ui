import type { LayoutType } from "@/types/LayoutTypes";

export interface IApp {
  collapse: boolean;
  footer: boolean;
  locale: boolean;
  layout: LayoutType;
  logo: boolean;
  dark: boolean;
  title: string;
  userInfo: string;
  fullScreen: boolean;
}
