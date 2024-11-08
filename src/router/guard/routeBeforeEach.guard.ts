import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useTitle } from "@/hooks/useTitle";
import { hideLoading, showLoading } from "@/hooks/useLoading";
import useAuth from "@/hooks/api/useAuth";

import { ClientStorage } from "@/utils";
import { getParameterByName } from "@/utils/getParameterFromUrl";
/**
 * If the user is not authenticated and the route is not the login route, redirect to the login route
 * @param {RouteLocationNormalized} to - The route we are navigating to
 * @param {RouteLocationNormalized} from - The route we are coming from
 * @param {NavigationGuardNext} next - This is a function that you must call to resolve the hook.
 */
const routeBeforeEach = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  showLoading({ fullscreen: true });
  const { authCallback } = useAuth();

  const isAuth = ClientStorage.load("__is_auth__");
  const provider: string | null = ClientStorage.load("__provider__");
  const code = getParameterByName("code");

  // login SSO
  if (provider && code) {
    await authCallback(provider, code);
    next();
  }

  // login default
  if (to.name !== "Login" && !isAuth) {
    next({ name: "Login" });
  } else next();

  hideLoading();
};
const routeAfterEach = (to: RouteLocationNormalized) => {
  useTitle(to?.meta?.title as string);
  hideLoading();
};

export { routeBeforeEach, routeAfterEach };
