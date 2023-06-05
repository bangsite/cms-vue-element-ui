import type { RouteComponent } from "vue-router";
import type { AuthRoute } from "@/types/router";
import { isFunction } from "@/shared/utils/typeof";
const MainLayout = () => import("@/layouts/MainLayout.vue");
const BlankLayout = () => import("@/layouts/BlankLayout.vue");

interface ModuleComponent {
  default: RouteComponent;
}
type Lazy<T> = () => Promise<T>;
type LayoutComponent = Record<LayoutComponentType, Lazy<ModuleComponent>>;

export function getLayoutComponent(layoutType: LayoutComponentType) {
  const layoutComponent: LayoutComponent = {
    basic: MainLayout,
    blank: BlankLayout,
  };
  return layoutComponent[layoutType];
}
/**
 * Get the vue file imported by the page
 * @param routeKey - routing key
 */
export function getViewComponent(routeKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[routeKey]) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`);
  }
  return setViewComponentName(views[routeKey], routeKey);
}
/** Set the name of the page component */
function setViewComponentName(component: RouteComponent | Lazy<ModuleComponent>, name: string) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component();
      Object.assign(result.default, { name });
      return result;
    };
  }

  Object.assign(component, { name });

  return component;
}

function isAsyncComponent(component: RouteComponent | Lazy<ModuleComponent>): component is Lazy<ModuleComponent> {
  return isFunction(component);
}
