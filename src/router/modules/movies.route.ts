import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Movies: AppRouteRecordRaw = {
  path: "/movies",
  name: "Movies",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.MOVIES.TITLE"),
    icon: "ri:movie-2-line",
    alwaysShow: true,
  },
  children: [
    {
      path: "list",
      name: "MovieList",
      component: () => import("@/views/Movies/MovieList.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.MOVIES.MOVIES_LIST"),
        icon: "ic:outline-movie",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "pro-list",
      name: "MovieProList",
      component: () => import("@/views/Movies/MovieProList.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.MOVIES.MOVIES_PRO_LIST"),
        icon: "mdi:movie-star-outline",
        noCache: true,
      },
    },
  ],
};
