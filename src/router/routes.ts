import { i18n } from "@/plugins/i18n";

import { Layout } from "@/helpers/router.helper";
import { Auth } from "@/router/modules/auth.route";
import { Dashboard } from "@/router/modules/dashboard.route";
import { Exception } from "@/router/modules/exception.route";
import { Builder } from "@/router/modules/builder.route";
import { Post } from "@/router/modules/post.route";
import { Product } from "@/router/modules/product.route";
import { Movies } from "@/router/modules/movies.route";

import { AuthGuard } from "@/router/guard/auth.guard";

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/cms",
    name: "Root",
    beforeEnter: [AuthGuard],
    meta: {
      hidden: true,
    },
  },
  { ...Auth },
  { ...Dashboard },
  { ...Builder },
  { ...Movies },
  { ...Post },
  { ...Product },
  { ...Exception },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/Exception/Error403.vue"),
    meta: {
      title: i18n.global.t("router.exception.403"),
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Exception/Error404.vue"),
    meta: {
      title: i18n.global.t("router.exception.404"),
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/Exception/Error500.vue"),
    meta: {
      title: i18n.global.t("router.exception.500"),
      hidden: true,
      noTagsView: true,
    },
  },
  {
    path: "/redirect",
    component: Layout,
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
];
