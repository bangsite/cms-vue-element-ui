import type { RouteRecordRaw } from "vue-router";

export const useFilterMenu = (routers: RouteRecordRaw[]) => {
  const filterChildren = (children: RouteRecordRaw[]) => {
    return children.filter((child) => !child.meta?.hidden);
  };

  return routers.reduce((filteredRoutes, route) => {
    if (!route.meta?.hidden) {
      // copy route
      const newRoute = { ...route };

      // filter children
      if (newRoute.children && newRoute.children.length > 0) {
        newRoute.children = filterChildren(newRoute.children);
      }

      // add route filtered in array
      filteredRoutes.push(newRoute);
    }
    return filteredRoutes;
  }, [] as RouteRecordRaw[]);
};
