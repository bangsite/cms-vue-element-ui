import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
// import { useAuthStore } from "@/stores/auth.store";
import { useTitle } from "@/hooks/web/useTitle";
import { usePageLoading } from "@/hooks/web/usePageLoading";
import { getCookie } from "@/utils/useCookies";

const { loadStart, loadDone } = usePageLoading();

/**
 * If the user is not authenticated and the route is not the login route, redirect to the login route
 * @param {RouteLocationNormalized} to - The route we are navigating to
 * @param {RouteLocationNormalized} from - The route we are coming from
 * @param {NavigationGuardNext} next - This is a function that you must call to resolve the hook.
 */
const routeBeforeEach = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  loadStart();
  // const authStore = useAuthStore();

  if (to.name !== "Login" && !getCookie("__x_key_at")) {
    next({ name: "Login" });
  } else next();
};

const routeAfterEach = (to: RouteLocationNormalized) => {
  useTitle(to?.meta?.title as string);
  loadDone();
};

export { routeBeforeEach, routeAfterEach };
