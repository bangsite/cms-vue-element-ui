import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Dashboard: AppRouteRecordRaw = {
  path: "/dashboard",
  redirect: "/dashboard/analysis",
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
      path: "analysis",
      name: "Analysis",
      component: () => import("@/views/Dashboard/AnalysisView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.DASHBOARD.ANALYSIS"),
        icon: "icon-park-outline:analysis",
      },
    },
    {
      path: "workbench",
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
