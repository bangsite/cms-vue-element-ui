import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Tables: AppRouteRecordRaw = {
  path: "/tables",
  name: "Tables",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.TABLES.TITLE"),
    icon: "fluent:table-add-28-regular",
    alwaysShow: true,
  },
  children: [
    {
      path: "basic-table",
      name: "BasicTable",
      component: () => import("@/views/Tables/BasicTable.vue"),
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
      component: () => import("@/views/Tables/ProTable.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TABLES.PRO_TABLE"),
        icon: "fluent:table-settings-20-regular",
        noCache: true,
      },
    },
  ],
};
