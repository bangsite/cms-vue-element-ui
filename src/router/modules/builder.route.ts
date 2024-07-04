import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Builder = {
  path: "/builder",
  name: "Builder",
  component: () => import("@/layouts/Default.vue"),
  beforeEnter: [AuthGuard],
  meta: {
    title: i18n.global.t("ROUTER.BUILDER.TITLE"),
    icon: "fluent:building-20-regular",
    hidden: false,
  },
  children: [
    {
      path: "dynamic-block",
      name: "DynamicBlock",
      component: () => import("@/views/builder/DynamicBlock.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.BUILDER.DYNAMIC_BLOCK"),
        icon: "radix-icons:section",
      },
    },
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
