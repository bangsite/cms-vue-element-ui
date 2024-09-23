import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
// import { useAuthStore } from "@/stores/auth.store";
import { useTitle } from "@/hooks/useTitle";
import { getCookie } from "@/utils/cookieUtil";
import { hideLoading, showLoading } from "@/hooks/useLoading";

/**
 * If the user is not authenticated and the route is not the login route, redirect to the login route
 * @param {RouteLocationNormalized} to - The route we are navigating to
 * @param {RouteLocationNormalized} from - The route we are coming from
 * @param {NavigationGuardNext} next - This is a function that you must call to resolve the hook.
 */
const routeBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  showLoading({ fullscreen: true });

  // const authStore = useAuthStore();

  if (to.name !== "Login" && !getCookie("__x_key_at__")) {
    next({ name: "Login" });
    hideLoading();
  } else {
    next();
    hideLoading();
  }
};

const routeAfterEach = (to: RouteLocationNormalized) => {
  useTitle(to?.meta?.title as string);
  hideLoading();
};

export { routeBeforeEach, routeAfterEach };
