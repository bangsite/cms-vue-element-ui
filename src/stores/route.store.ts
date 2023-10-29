import { defineStore } from "pinia";
import { RouteState } from "@/core/interfaces/route.interface";

export const useRouteStore = defineStore("route-store", {
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: [],
  }),
  actions: () => {},
});
