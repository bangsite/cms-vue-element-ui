import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { ClientStorage } from "@/utils";

export const LoginGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuth = ClientStorage.load("__is_auth__");
  if (to.name === "Login" && isAuth) {
    return next({ name: "Dashboard" });
  } else next();
};
