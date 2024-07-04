import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Dashboard = {
  path: "/",
  redirect: "/cms",
  name: "Dashboard",
  component: () => import("@/layouts/Default.vue"),
  beforeEnter: [AuthGuard],
  meta: {
    title: i18n.global.t("ROUTER.DASHBOARD.TITLE"),
    icon: "mdi:monitor-dashboard",
    hidden: false,
  },
  children: [
    {
      path: "/cms",
      name: "Overview",
      component: () => import("@/views/dashboard/DashboardView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.DASHBOARD.OVERVIEW"),
        icon: "material-symbols:overview-outline-rounded",
      },
    },
    {
      path: "/cms/workbench",
      name: "Workbench",
      component: () => import("@/views/dashboard/WorkbenchView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.DASHBOARD.WORKBENCH"),
        icon: "icon-park-outline:workbench",
      },
    },
  ],
};
