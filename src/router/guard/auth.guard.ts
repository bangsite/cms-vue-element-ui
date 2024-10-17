import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { ClientStorage } from "@/utils";

export const AuthGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const isAuth = ClientStorage.load("__is_auth__");
  if (to.name !== "Login" && !isAuth) {
    next({ name: "Login" });
  } else next();
};
