import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Board = {
  path: "/board",
  name: "Board",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.BOARD.TITLE"),
    icon: "ri:trello-line",
    hidden: false,
  },
  children: [
    {
      path: "list",
      name: "TBoardList",
      component: () => import("@/views/board/BoardView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.BOARD.LIST"),
      },
    },
  ],
};
