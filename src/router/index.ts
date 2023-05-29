import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { constantRouterMap } from "./routes";
import { routeBeforeEach } from "@/core/guard/routeBeforeEach.guard";

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "",
    routes: constantRouterMap as RouteRecordRaw[],
    scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

router.beforeEach(routeBeforeEach);

const setupRouter = async (app: App<Element>) => {
    // createRouterGuards(router, name);
    app.use(router);
    // await router.isReady();
};
const resetRouter = (): void => {
    const resetWhiteNameList = ["Redirect", "Login", "NoFind", "Root"];
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
};

export { setupRouter, resetRouter };

export default router;
