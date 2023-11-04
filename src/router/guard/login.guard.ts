import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

export const LoginGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore();

  if (to.name !== "dashboard" && authStore.token) {
    return next({ name: "dashboard" });
  } else next();
};
