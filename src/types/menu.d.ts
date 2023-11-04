import { menuProps } from "element-plus";

export type GlobalMenu = menuProps & {
  key: string;
  label: string;
  routeName: string;
  routePath: string;
  icon?: () => import("vue").VNodeChild;
  children?: GlobalMenu[];
  i18nTitle?: string;
};
