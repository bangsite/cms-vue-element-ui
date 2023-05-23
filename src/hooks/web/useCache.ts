import { LocalStorage, SessionStorage } from "@/plugins/web-store-cache";

type CacheType = "sessionStorage" | "localStorage";

export const useCache = (type: CacheType = "sessionStorage") => {
  let wsCache;

  if (type === "sessionStorage") wsCache = new SessionStorage();
  else wsCache = new LocalStorage();

  return { wsCache };
};
