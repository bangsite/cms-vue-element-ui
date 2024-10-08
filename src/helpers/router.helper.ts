import type { RouteLocationNormalized, RouteMeta, Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { deepCopy, omit } from "@/helpers/object.helper";
import { isUrl } from "@/utils/isCheckVal";

const modules = import.meta.glob("../views/**/*.{vue}");

export const Layout = () => import("@/layouts/Default.vue");

export const getParentLayout = () => {
  return () =>
    new Promise((resolve) => {
      resolve({ name: "ParentLayout" });
    });
};

export const getRawRoute = (route: RouteLocationNormalized): RouteLocationNormalized => {
  if (!route) return route;
  const { matched, ...opt } = route;

  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
};
export const generateRoutesFn1 = (routes: RouteRecordRaw[], keys: string[], basePath = "/"): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];

  for (const route of routes) {
    const meta = route.meta as RouteMeta;
    // skip some route
    if (meta.hidden && !meta.canTo) {
      continue;
    }

    let data: RouteRecordRaw | null = null;
    let onlyOneChild: string | null = null;

    if (route.children && route.children.length === 1 && !meta.alwaysShow) {
      onlyOneChild = (
        isUrl(route.children[0].path)
          ? route.children[0].path
          : pathResolve(pathResolve(basePath, route.path), route.children[0].path)
      ) as string;
    }

    // Developers can expand according to the actual situation
    for (const item of keys) {
      // match by path
      if (isUrl(item) && (onlyOneChild === item || route.path === item)) {
        data = Object.assign({}, route);
      } else {
        const routePath = onlyOneChild ?? pathResolve(basePath, route.path);
        if (routePath === item || meta.followRoute === item) {
          data = Object.assign({}, route);
        }
      }
    }

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutesFn1(route.children, keys, pathResolve(basePath, data.path));
    }
    if (data) res.push(data as RouteRecordRaw);
  }
  return res;
};
export const generateRoutesFn2 = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];

  for (const route of routes) {
    const data: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta,
    };
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`] || modules[`../${route.component}.tsx`];
      const component = route.component as string;
      if (!comModule && !component.includes("#")) {
        console.error(`not found ${route.component}.vue file，please create`);
      } else {
        // Dynamically load routing files, which can be customized according to the actual situation
        data.component = component === "#" ? Layout : component.includes("##") ? getParentLayout() : comModule;
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutesFn2(route.children);
    }
    res.push(data as RouteRecordRaw);
  }
  return res;
};
export const pathResolve = (parentPath: string, path: string) => {
  if (isUrl(path)) return path;
  const childPath = path.startsWith("/") || !path ? path : `/${path}`;
  return `${parentPath}${childPath}`.replace(/\/\//g, "/");
};
export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  const modules: RouteRecordRaw[] = deepCopy(routes);
  for (let index = 0; index < modules.length; index++) {
    const route = modules[index];
    if (!isMultipleRoute(route)) {
      continue;
    }
    promoteRouteLevel(route);
  }
  return modules;
};

const isMultipleRoute = (route: RouteRecordRaw) => {
  if (!route || !Reflect.has(route, "children") || !route.children?.length) {
    return false;
  }

  const children = route.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
};

const promoteRouteLevel = (route: RouteRecordRaw) => {
  const router: Router | null = createRouter({
    routes: [route as RouteRecordRaw],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, route.children || [], route);

  if (route.children) route.children = route.children?.map((item) => omit(item, ["children"]));
};
const addToChildren = (routes: RouteRecordNormalized[], children: [], routeModule: RouteRecordRaw) => {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as RouteRecordRaw);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
};
