import { defineStore } from "pinia";
import { generateRoutesFn1, generateRoutesFn2, flatMultiLevelRoutes } from "@/shared/helpers/router.helper";
import { PermissionState } from "@/core/interfaces/permission.interface";
import { cloneDeep } from "lodash-es";
import { store } from "@/plugins/pinia";
import { asyncRouterMap, constantRouterMap } from "@/router/routes";
export const usePermissionStore = defineStore("permission", {
    state: (): PermissionState => ({
        routers: [],
        addRouters: [],
        isAddRouters: false,
        menuTabRouters: [],
    }),
    getters: {
        getRouters(): PermissionState["routers"] {
            return this.routers as PermissionState["routers"];
        },
        getAddRouters(): AppRouteRecordRaw[] {
            return flatMultiLevelRoutes(cloneDeep(this.addRouters) as AppRouteRecordRaw[]);
        },
        getIsAddRouters(): boolean {
            return this.isAddRouters;
        },
        getMenuTabRouters(): PermissionState["menuTabRouters"] {
            return this.menuTabRouters as PermissionState["menuTabRouters"];
        },
    },
    actions: {
        generateRoutes(type: "admin" | "test" | "none", routers?: AppCustomRouteRecordRaw[] | string[]): Promise<unknown> {
            return new Promise<void>((resolve) => {
                let routerMap: AppRouteRecordRaw[] = [];
                if (type === "admin") {
                    // Simulate the backend filter menu
                    routerMap = generateRoutesFn2(routers as AppCustomRouteRecordRaw[]);
                } else if (type === "test") {
                    // Analog front-end filter menu
                    routerMap = generateRoutesFn1(cloneDeep(asyncRouterMap), routers as string[]);
                } else {
                    // directly read the static routing table
                    routerMap = cloneDeep(asyncRouterMap);
                }
                // Dynamic routing, 404 must be placed at the end
                this.addRouters = routerMap.concat([
                    {
                        path: "/:path(.*)*",
                        redirect: "/404",
                        name: "404Page",
                        meta: {
                            hidden: true,
                            breadcrumb: false,
                        },
                    },
                ]);

                // Render all routes of the menu
                this.routers = cloneDeep(constantRouterMap).concat(routerMap);
                resolve();
            });
        },
        setIsAddRouters(state: boolean): void {
            this.isAddRouters = state;
        },
        setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
            this.menuTabRouters = routers;
        },
    },
});

export const usePermissionStoreWithOut = () => {
    return usePermissionStore(store);
};
