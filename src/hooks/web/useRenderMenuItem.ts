import type { RouteLocationMatched, RouteMeta } from "vue-router";
import { hasOneShowingChild } from "@/helpers/menu.helper";
import { pathResolve } from "@/helpers/router.helper";
import { isUrl } from "@/utils/isCheck";

export const useFilterMenu = (routers: RouteLocationMatched[]) => {
  const filterMenuFirst = routers.filter((item) => {
    const meta = (item.meta ?? {}) as RouteMeta;
    return !meta.hidden;
  });

  return filterMenuFirst.filter((item) => {
    if (item.children) {
      const newItem = item.children.filter((child) => {
        const meta = (child.meta ?? {}) as RouteMeta;
        return !meta.hidden;
      });
      item.children = newItem;
      return newItem;
    }
  });
};
export const useRenderMenuItem = () => {
  const renderMenuItem = (routers: AppRouteRecordRaw[], parentPath = "/") => {
    return routers.map((item) => {
      const meta = (item.meta ?? {}) as RouteMeta;

      if (!meta.hidden) {
        const { oneShowingChild, onlyOneChild } = hasOneShowingChild(item.children, item);
        const fullPath = isUrl(item.path) ? item.path : pathResolve(parentPath, item.path);
        console.log(fullPath);
        console.log(oneShowingChild);
        console.log(onlyOneChild);
        return {
          oneShowingChild,
          onlyOneChild,
        };
      }
    });
  };

  return {
    renderMenuItem,
  };
};
