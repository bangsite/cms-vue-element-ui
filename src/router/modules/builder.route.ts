import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Builder: AppRouteRecordRaw = {
  path: "/builder",
  name: "Builder",
  component: Layout,
  beforeEnter: [AuthGuard],
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
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.BUILDER.DYNAMIC_BLOCK"),
        icon: "radix-icons:section",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "dynamic-page",
      name: "DynamicPage",
      component: () => import("@/views/Builder/DynamicPage.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.BUILDER.DYNAMIC_PAGE"),
        icon: "material-symbols:dynamic-feed-rounded",
        noCache: true,
        affix: true,
      },
    },
  ],
};
