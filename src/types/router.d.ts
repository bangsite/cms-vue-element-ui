import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { defineComponent } from "vue";

declare namespace AuthRoute {
  type RootRoutePath = "/";
  type NotFoundRoutePath = "/:pathMatch(.*)*";
  type RootRouteKey = PageRoute.RootRouteKey;
  type NotFoundRouteKey = PageRoute.NotFoundRouteKey;
  type RouteKey = PageRoute.RouteKey;
  type LastDegreeRouteKey = PageRoute.LastDegreeRouteKey;
  type AllRouteKey = RouteKey | RootRouteKey | NotFoundRouteKey;
  type RoutePath<K extends AllRouteKey = AllRouteKey> = AuthRouteUtils.GetRoutePath<K>;
  /**
   * Routing components
   * - basic - base layout, layout with common parts
   * - blank - blank layout
   * - multi - multi-level routing layout (when there are three or more levels of routing, except for the first-level routing and the last-level routing, the rest adopt this layout)
   * - self - as a child route, using its own layout (as the last level route, no child route)
   */
  type RouteComponentType = "basic" | "blank" | "multi" | "self";

  interface RouteMeta<K extends AuthRoute.RoutePath> {
    /** Route title (can be used as document.title or menu name) */
    title: string;
    /** Used to support multiple languages If i18nTitle and title exist at the same time, i18nTitle is preferred */
    i18nTitle?: string;
    /** The dynamic path of the route (pages that require a dynamic path need to add path to the generic parameter) */
    dynamicPath?: AuthRouteUtils.GetDynamicPath<K>;
    /** As the parent routing layout component of single-level routing */
    singleLayout?: Extract<RouteComponentType, "basic" | "blank">;
    /** Requires login permission */
    requiresAuth?: boolean;
    /**
     * What types of routes can only be accessed by users with permissions (if empty, it means no permissions are required)
     * @description Backend dynamic routing data does not need this attribute, and the backend directly returns routing data with corresponding permissions according to user roles
     */
    permissions?: Auth.RoleType[];
    /** Cache page */
    keepAlive?: boolean;
    /** Icons corresponding to menus and breadcrumbs */
    icon?: string;
    /** Use local svg as the icon corresponding to the menu and breadcrumbs (the svg file name of the assets/svg-icon folder) */
    localIcon?: string;
    /** Whether to hide in the menu (the detail pages of some lists and tables need to jump through parameters, so they cannot be displayed in the menu) */
    hide?: boolean;
    /** External link */
    href?: string;
    /** Whether to support multiple tabs (default one, that is, routes with the same name will be replaced) */
    multiTab?: boolean;
    /** Routing order, can be used for menu sorting */
    order?: number;
    /** The menu item that needs to be selected for the current route (used to jump to a route that is not displayed on the left menu and needs to highlight a certain menu) */
    activeMenu?: RouteKey;
    /** Indicates whether it is an intermediate-level route of a multi-level route (used to filter the identification of multi-level routes when converting routing data, and does not need to be filled in when defining routes) */
    multi?: boolean;
    /** Whether it is fixed on the tab card and cannot be closed */
    affix?: boolean;
  }

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        /** Route name (route unique identifier) */
        name: K;
        /** Routing path */
        path: AuthRouteUtils.GetRoutePath<K>;
        /** Route redirection */
        redirect?: AuthRouteUtils.GetRoutePath;
        /**
         * Routing component
         * - basic: basic layout, layout with common parts
         * - blank: blank layout
         * - multi: multi-level routing layout (when there are three or more levels of routing, except for the first-level routing and the last-level routing, the rest adopt this layout)
         * - self: As a child route, use its own layout (as the last level route, no child route)
         */
        component?: RouteComponentType;
        /** Sub-routes */
        children?: Route[];
        /** route description */
        meta: RouteMeta<RoutePath<K>>;
      } & Omit<RouteRecordRaw, "name" | "path" | "redirect" | "component" | "children" | "meta">
    : never;

    type RouteModule = Record<string, { default: Route }>;
}

declare namespace AuthRouteUtils {
  /** Routing key level separator */
  type RouteKeySplitMark = "_";
  /** Routing path level separator */
  type RoutePathSplitMark = "/";
  type BlankString = "";
  /** Key converted to path */
  type KeyToPath<K extends string> = K extends `${infer _Left}${RouteKeySplitMark}${RouteKeySplitMark}${infer _Right}`
    ? never
    : K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
    ? Left extends BlankString
      ? never
      : Right extends BlankString
      ? never
      : KeyToPath<`${Left}${RoutePathSplitMark}${Right}`>
    : `${RoutePathSplitMark}${K}`;
  /** Obtain the routing path according to the routing key */
  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> = K extends AuthRoute.AllRouteKey
    ? K extends AuthRoute.RootRouteKey
      ? AuthRoute.RootRoutePath
      : K extends AuthRoute.NotFoundRouteKey
      ? AuthRoute.NotFoundRoutePath
      : KeyToPath<K>
    : never;
  /** Get the first-level route (the first-level route with sub-routes and the route without sub-routes) */
  type GetFirstDegreeRouteKey<K extends AuthRoute.RouteKey = AuthRoute.RouteKey> =
    K extends `${infer _Left}${RouteKeySplitMark}${infer _Right}` ? never : K;

  /** Get the first-level route with sub-routes */
  type GetFirstDegreeRouteKeyWithChildren<K extends AuthRoute.RouteKey = AuthRoute.RouteKey> =
    K extends `${infer Left}${RouteKeySplitMark}${infer _Right}` ? Left : never;
  /** The key of single-level routing (single-level routing needs to add a parent routing for application layout components) */
  type SingleRouteKey = Exclude<
    GetFirstDegreeRouteKey,
    GetFirstDegreeRouteKeyWithChildren | AuthRoute.RootRouteKey | AuthRoute.NotFoundRouteKey
  >;
  /** Single routing parent routing key */
  type SingleRouteParentKey = `${SingleRouteKey}-parent`;
  /** Single routing parent routing path */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>;
  /** Get route dynamic path */
  type GetDynamicPath<P extends AuthRoute.RoutePath> =
    | `${P}/:${string}`
    | `${P}/:${string}(${string})`
    | `${P}/:${string}(${string})?`;
}


declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        hidden?: boolean
        alwaysShow?: boolean
        title?: string
        icon?: string
        noCache?: boolean
        breadcrumb?: boolean
        affix?: boolean
        activeMenu?: string
        noTagsView?: boolean
        followAuth?: string
        canTo?: boolean
    }
}

type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

declare global {
    declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component?: Component | string
        children?: AppRouteRecordRaw[]
        props?: Recordable
        fullPath?: string
    }

    declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component: string
        path: string
        redirect: string
        children?: AppCustomRouteRecordRaw[]
    }
}
