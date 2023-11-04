import type { RouteMeta } from "vue-router";
import { findPath } from "./tree.helper";
import { isUrl } from "@/utils/isCheck";
import { pathResolve } from "@/helpers/router.helper";

type OnlyOneChildType = AppRouteRecordRaw & { noShowingChildren?: boolean };

interface HasOneShowingChild {
  oneShowingChild?: boolean;
  onlyOneChild?: OnlyOneChildType;
}

export const getAllParentPath = <T = Recordable>(treeData: T[], path: string) => {
  const menuList = findPath(treeData, (n) => n.path === path) as AppRouteRecordRaw[];
  return (menuList || []).map((item) => item.path);
};

export const fullPath = (data: AppRouteRecordRaw, parentPath = "/") => {
  return isUrl(data.path) ? data.path : pathResolve(parentPath, data.path);
};
export const hasOneShowingChild = (children: AppRouteRecordRaw[] = []) => {
  const showingChildren = children.filter((v) => {
    const meta = (v.meta ?? {}) as RouteMeta;
    return !meta.hidden;
  });

  if (showingChildren.length === 0) return "noChild";
  else if (showingChildren.length === 1) return "oneChild";
  else return "moreChild";
};

// export const hasOneShowingChild = (
//     children: AppRouteRecordRaw[] = [],
//     parent: AppRouteRecordRaw,
// ): HasOneShowingChild => {
//     const onlyOneChild = ref<OnlyOneChildType>();
//
//     const showingChildren = children.filter((v) => {
//         const meta = (v.meta ?? {}) as RouteMeta;
//         if (meta.hidden) {
//             return false;
//         } else {
//             // Temp set(will be used if only has one showing child)
//             onlyOneChild.value = v;
//             return true;
//         }
//     });
//
//     // When there is only one child router, the child router is displayed by default
//     if (showingChildren.length === 1) {
//         return {
//             oneShowingChild: true,
//             onlyOneChild: unref(onlyOneChild),
//         };
//     }
//
//     // Show parent if there are no child router to display
//     if (!showingChildren.length) {
//         onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
//         return {
//             oneShowingChild: true,
//             onlyOneChild: unref(onlyOneChild),
//         };
//     }
//
//     return {
//         oneShowingChild: false,
//         onlyOneChild: unref(onlyOneChild),
//     };
// };
