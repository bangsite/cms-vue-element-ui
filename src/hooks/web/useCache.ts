import { createCacheModel, storageLikeDriver } from "@/plugins/web-store-cache";

// export const localStorageCache = createCacheModel(storageLikeDriver(localStorage));

export const useCache = (type: Storage = sessionStorage) => {
  const wsCache = createCacheModel(storageLikeDriver(type));

  return wsCache;
};
// https://giancarlobuomprisco.com/rxjs/caching-rxjs-streams-into-web-storage
