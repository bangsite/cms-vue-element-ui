import { LoginGuard } from "@/router/guard/login.guard";
import { i18n } from "@/plugins/i18n";

export const Auth: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/Auth/LoginView.vue"),
  beforeEnter: [LoginGuard],
  meta: {
    title: i18n.global.t("router.login.title"),
    hidden: true,
    noTagsView: true,
  },
};
