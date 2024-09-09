import type { RouteMeta } from "vue-router";
import { pathResolve } from "@/helpers/router.helper";
import { type RouteRecordRaw } from "vue-router";

export const filterBreadcrumb = (routes: RouteRecordRaw[], parentPath = ""): RouteRecordRaw[] => {
  const res: RouteRecordRaw[] = [];
  for (const route of routes) {
    const meta = route?.meta as RouteMeta;
    if (meta.hidden && !meta.canTo) {
      continue;
    }

    const data: RouteRecordRaw =
      !meta.alwaysShow && route.children?.length === 1
        ? { ...route.children[0], path: pathResolve(route.path, route.children[0].path) }
        : { ...route };

    data.path = pathResolve(parentPath, data.path);

    if (data.children) {
      data.children = filterBreadcrumb(data.children, data.path);
    }
    if (data) {
      res.push(data);
    }
  }

  return res;
};
