import { LoginGuard } from "@/router/guard/login.guard";
import { i18n } from "@/plugins/vue-i18n";

export const Auth = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/auth/LoginView.vue"),
  beforeEnter: [LoginGuard],
  meta: {
    title: i18n.global.t("ROUTER.LOGIN.TITLE"),
    hidden: true,
    noTagsView: true,
  },
};
