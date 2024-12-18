import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { routerMap } from "./routes";
import { routeBeforeEach, routeAfterEach } from "./guard/routeBeforeEach.guard";

const router = createRouter({
  strict: true,
  history: createWebHistory(),
  linkActiveClass: "route-link-active",
  routes: routerMap as RouteRecordRaw[],
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

router.beforeEach(routeBeforeEach);
router.afterEach(routeAfterEach);

export const resetRouter = (): void => {
  const resetWhiteNameList = ["Redirect", "Login", "NotFound", "Root"];

  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

export const setupRouter = async (app: App<Element>) => {
  app.use(router);
  // createRouterGuards(router, name);
  // await router.isReady();
};

export default router;
