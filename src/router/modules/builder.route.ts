import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";

export const Builder: AppRouteRecordRaw = {
  path: "/builder",
  name: "Builder",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.BUILDER.TITLE"),
    icon: "fluent:building-20-regular",
    alwaysShow: true,
  },
  children: [
    {
      path: "dynamic-block",
      name: "DynamicBlock",
      component: () => import("@/views/Builder/DynamicBlock.vue"),
      meta: {
        title: i18n.global.t("ROUTER.BUILDER.DYNAMIC_BLOCK"),
        icon: "radix-icons:section",
        noCache: true,
        affix: true,
      },
    },
  ],
};
