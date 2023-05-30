import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { constantRouterMap } from "./routes";
import { routeBeforeEach } from "@/core/guard/routeBeforeEach.guard";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

router.beforeEach(routeBeforeEach);

export const resetRouter = (): void => {
  const resetWhiteNameList = ["Redirect", "Login", "NoFind", "Root"];
  console.log(router.getRoutes());
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

export const setupRouter = async (app: App<Element>) => {
  // createRouterGuards(router, name);
  app.use(router);
  // await router.isReady();
};

export default router;
