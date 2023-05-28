export const setCssVar = (prop: string, val: string | null, dom = document.documentElement) => {
  dom.style.setProperty(prop, val);
};
