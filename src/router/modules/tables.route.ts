import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Tables = {
  path: "/tables",
  name: "Tables",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.TABLES.TITLE"),
    icon: "fluent:table-add-28-regular",
    hidden: false,
  },
  children: [
    {
      path: "basic-table",
      name: "BasicTable",
      component: () => import("@/views/tables/BasicTable.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TABLES.BASIC_TABLE"),
        icon: "fluent:table-20-regular",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "pro-table",
      name: "ProTable",
      component: () => import("@/views/tables/ProTable.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TABLES.PRO_TABLE"),
        icon: "fluent:table-settings-20-regular",
        noCache: true,
      },
    },
  ],
};
