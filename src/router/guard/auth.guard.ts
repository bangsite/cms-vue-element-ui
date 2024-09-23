import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { getCookie } from "@/utils/cookieUtil";

export const AuthGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.name !== "Login" && !getCookie("__x_key_at__")) {
    next({ name: "Login" });
  } else next();
};
