import type { LocaleType } from "@/types";

export const setHtmlLang = (locale: LocaleType) => {
  document.querySelector("html")?.setAttribute("lang", locale);
};
