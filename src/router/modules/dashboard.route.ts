import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Dashboard: AppRouteRecordRaw = {
  path: "/",
  redirect: "/cms",
  name: "Dashboard",
  component: Layout,
  beforeEnter: [AuthGuard],
  meta: {
    title: i18n.global.t("ROUTER.DASHBOARD.TITLE"),
    icon: "mdi:monitor-dashboard",
    alwaysShow: true,
  },
  children: [
    {
      path: "/cms",
      name: "Overview",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.DASHBOARD.OVERVIEW"),
        icon: "material-symbols:overview-outline-rounded",
      },
    },
    {
      path: "/cms/workbench",
      name: "Workbench",
      component: () => import("@/views/Dashboard/WorkbenchView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.DASHBOARD.WORKBENCH"),
        icon: "icon-park-outline:workbench",
      },
    },
  ],
};
