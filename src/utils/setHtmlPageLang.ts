import type { LocaleType } from "@/types";

export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector("html")?.setAttribute("lang", locale);
};
