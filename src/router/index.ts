import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { constantRouterMap } from "./routes";
import { routeBeforeEach, routeAfterEach } from "./guard/routeBeforeEach.guard";

console.log(constantRouterMap);
const router = createRouter({
  strict: true,
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: constantRouterMap as RouteRecordRaw[],
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
  console.log(router);
  app.use(router);
  // createRouterGuards(router, name);
  // await router.isReady();
};

export default router;
