import { defineAsyncComponent } from "vue";

export const lazyLoadView = (view: string) => {
  const views = import.meta.glob("../views/**/*.vue");
  const viewPath = `../views/${view}.vue`;

  if (!views[viewPath]) throw new Error(`Unknown view: ${view}`);

  return defineAsyncComponent(views[viewPath]);
};

export const lazyLoadComponent = (component: string) => {
  const components = import.meta.glob("../components/**/*.vue");
  const componentPath = `../components/${component}.vue`;

  if (!components[componentPath]) throw new Error(`Unknown component: ${component}`);

  return defineAsyncComponent(components[componentPath]);
};
