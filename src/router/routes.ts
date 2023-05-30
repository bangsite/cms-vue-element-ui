import { dashboard } from "./modules/dashboard.route";
import { useI18n } from "@/hooks/web/useI18n";

const { t } = useI18n();

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    redirect: "/dashboard/analysis",
    name: "Root",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/redirect",
    component: () => import("@/layouts/MainLayout.vue"),
    name: "Redirect",
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/views/Redirect/RedirectView.vue"),
        meta: {},
      },
    ],
    meta: {
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: "/login",
    component: () => import("@/views/Auth/LoginView.vue"),
    name: "Login",
    meta: {
      hidden: true,
      title: t("router.login"),
      noTagsView: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/Error/404.vue"),
    name: "NoFind",
    meta: {
      hidden: true,
      title: "404",
      noTagsView: true,
    },
  },
  ...dashboard,
];

export const asyncRouterMap: AppRouteRecordRaw[] = [...dashboard];
