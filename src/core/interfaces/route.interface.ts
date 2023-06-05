import type { AuthRoute } from "@/types/router";

export interface RouteState {
  /**
   * Authority routing mode:
   * - static - the static declared by the frontend
   * - dynamic - the dynamic returned by the backend
   */
  authRouteMode: ImportMetaEnv["VITE_AUTH_ROUTE_MODE"];
  /** Whether the authority routing is initialized */
  isInitAuthRoute: boolean;
  /** Routing home page name (valid for front-end static routing, this value will be overwritten by the value returned by back-end dynamic routing) */
  routeHomeName: AuthRoute.AllRouteKey;
  /** Menu */
  menus: AuthRoute.Route[];
  /** Search menu */
  searchMenus: AuthRoute.Route[];
  /** Cached route name */
  cacheRoutes: string[];
}
