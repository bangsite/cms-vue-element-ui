import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Builder = {
  path: "/builder",
  name: "Builder",
  component: () => import("@/layouts/Default.vue"),
  beforeEnter: [AuthGuard],
  meta: {
    title: i18n.global.t("ROUTER.BUILDER.TITLE"),
    icon: "mingcute:layout-4-line",
    hidden: false,
  },
  children: [
    {
      path: "dynamic-page",
      name: "DynamicPage",
      component: () => import("@/views/builder/DynamicPage.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.BUILDER.DYNAMIC_PAGE"),
        icon: "material-symbols:dynamic-feed-rounded",
      },
    },
  ],
};
