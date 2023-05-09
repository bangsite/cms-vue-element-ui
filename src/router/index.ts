import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { routeBeforeEach } from "@/core/guard/routeBeforeEach.guard";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "active",
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(routeBeforeEach);

const setupRouter = async (app: App) => {
  // createRouterGuards(router, name);
  app.use(router);
  await router.isReady();
};

export { setupRouter };
export default { router };
