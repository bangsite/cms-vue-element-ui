import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Table = {
  path: "/table",
  name: "Table",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.TABLE.TITLE"),
    icon: "ri:table-view",
    hidden: false,
  },
  children: [
    {
      path: "basic",
      name: "TableBasic",
      component: () => import("@/views/table/TableBasic.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TABLE.TABLE_BASIC"),
        icon: "ic:outline-movie",
      },
    },
    {
      path: "animes",
      name: "TableAnimes",
      component: () => import("@/views/table/TableAnimes.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TABLE.TABLE_ANIMES"),
        icon: "ic:outline-movie",
      },
    },
  ],
};
