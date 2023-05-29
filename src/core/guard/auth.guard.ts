import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/core/stores/auth.store";

export const AuthGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();

    if (to.name !== "login" && !authStore.token) {
        next({ name: "login" });
        return;
    } else next();
};
