import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Movies = {
  path: "/movies",
  name: "Movies",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.MOVIES.TITLE"),
    icon: "ri:movie-2-line",
    hidden: false,
  },
  children: [
    {
      path: "list",
      name: "MovieList",
      component: () => import("@/views/movies/MovieList.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.MOVIES.MOVIES_LIST"),
        icon: "ic:outline-movie",
      },
    },
  ],
};
