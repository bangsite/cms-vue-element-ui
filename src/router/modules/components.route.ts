import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Components: AppRouteRecordRaw = {
  path: "/components",
  name: "Components",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.COMPONENTS.TITLE"),
    icon: "iconamoon:component",
    alwaysShow: true,
  },
  children: [
    {
      path: "table-basic",
      name: "TableBasic",
      component: () => import("@/views/components/table/TableView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.COMPONENTS.TABLE_BASIC"),
        icon: "fluent:table-20-regular",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "table-drag-column",
      name: "TableDragColumn",
      component: () => import("@/views/components/table/TableDragColumns.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.COMPONENTS.TABLE_DRAG_COLUMN"),
        icon: "fluent:column-triple-20-regular",
        noCache: true,
      },
    },
    {
      path: "table-drag-row",
      name: "TableDragRow",
      component: () => import("@/views/components/table/TableDragRows.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.COMPONENTS.TABLE_DRAG_ROW"),
        icon: "fluent:row-triple-20-regular",
        noCache: true,
      },
    },
  ],
};
