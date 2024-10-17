import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useRouter } from "vue-router";
import { ClientStorage } from "@/utils";

export const LoginGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuth = ClientStorage.load("__is_auth__");
  console.log("authStore auth guard:", isAuth);
  // window.history.replaceState({}, document.title, window.location.pathname);
  const router = useRouter();
  // router.replace();
  console.log("LoginGuard:", router);
  if (to.name === "Login" && isAuth) {
    return next({ name: "Dashboard" });
  } else next();
};
