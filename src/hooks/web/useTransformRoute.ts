import type { AuthRoute, AuthRouteUtils } from "@/types/router";
import type { RouteRecordRaw } from "vue-router";
import { getLayoutComponent, getViewComponent } from "@/hooks/web/useComponent";

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * Convert authority routing to vue routing
 * @param routes - permission routes
 * @description All multi-level routes will be converted into second-level routes
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

/**
 * Convert a single authority route to a vue route
 * @param item - single permission route
 */

export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item };

  // dynamic path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath });
  }

  // external link route
  if (hasHref(item)) {
    Object.assign(itemRoute, { component: getViewComponent("404") });
  }

  // routing component
  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent("basic");
      },
      blank() {
        itemRoute.component = getLayoutComponent("blank");
      },
      multi() {
        // Multi-level routes must have sub-routes
        if (hasChildren(item)) {
          Object.assign(itemRoute, { meta: { ...itemRoute.meta, multi: true } });
          delete itemRoute.component;
        } else {
          window.console.error("Multi-level routing is missing sub-routing: ", item);
        }
      },
      self() {
        itemRoute.component = getViewComponent(item.name as AuthRoute.LastDegreeRouteKey);
      },
    };
    try {
      if (item.component) {
        action[item.component]();
      } else {
        window.console.error("The routing component parsing failed: ", item);
      }
    } catch {
      window.console.error("The routing component parsing failed: ", item);
    }
  }

  // Note: a single route has no children
  if (isSingleRoute(item)) {
    if (hasChildren(item)) {
      window.console.error("A single route should not have sub-routes: ", item);
    }

    // Special handling is required to capture invalid routes
    if (item.name === "not-found") {
      itemRoute.children = [
        {
          path: "",
          name: item.name,
          component: getViewComponent("not-found"),
        },
      ];
    } else {
      const parentPath = `${itemRoute.path}-parent` as AuthRouteUtils.SingleRouteKey;

      const layout = item.meta.singleLayout === "basic" ? getLayoutComponent("basic") : getLayoutComponent("blank");

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      };

      return [parentRoute];
    }
  }

  // child route
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[]).map((child) => transformAuthRouteToVueRoute(child)).flat();

    // Find the first sub-routing path that is not an intermediate level of multi-level routing as the redirection path
    const redirectPath = (children.find((v) => !v.meta?.multi)?.path || "/") as AuthRoute.RoutePath;

    if (redirectPath === "/") {
      window.console.error("The multi-level route has no valid sub paths", item);
    }

    if (item.component === "multi") {
      // Multi-level routing, extracting sub-routes and turning them into peers
      resultRoute.push(...children);
      delete itemRoute.children;
    } else {
      itemRoute.children = children;
    }
    itemRoute.redirect = redirectPath;
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

function hasHref(item: AuthRoute.Route) {
  return Boolean(item.meta.href);
}

/**
 * Whether there is a dynamic routing path
 * @param item - permission route
 */
function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath);
}

/**
 * Whether there is a routing component
 * @param item - permission route
 */
function hasComponent(item: AuthRoute.Route) {
  return Boolean(item.component);
}

/**
 * Whether there is a sub-routing
 * @param item - permission route
 */
function hasChildren(item: AuthRoute.Route) {
  return Boolean(item.children && item.children.length);
}

/**
 * Whether it is a single-level route
 * @param item - permission route
 */
function isSingleRoute(item: AuthRoute.Route) {
  return Boolean(item.meta.singleLayout);
}
