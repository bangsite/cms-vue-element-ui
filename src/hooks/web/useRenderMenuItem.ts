import type { RouteMeta } from "vue-router";
import { hasOneShowingChild } from "@/helpers/menu.helper";
import { pathResolve } from "@/helpers/router.helper";
import { isUrl } from "@/utils/isCheckVal";

export const useFilterMenu = (routers: any[]) => {
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
  const renderMenuItem = (routers: AppRouteRecordRaw[]) => {
    return routers.map((item) => {
      const meta = (item.meta ?? {}) as RouteMeta;

      if (!meta.hidden) {
        const isChild = hasOneShowingChild(item.children, item);
        // const fullPath = isUrl(item.path) ? item.path : pathResolve(parentPath, item.path);

        return {
          isChild,
        };
      }
    });
  };

  return {
    renderMenuItem,
  };
};
