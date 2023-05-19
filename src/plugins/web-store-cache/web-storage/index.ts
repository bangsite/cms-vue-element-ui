import { createStorageLikeCache } from "../storage-like";

export const localStorageCache = createStorageLikeCache({
  storageLike: localStorage,
  support: () => !!window.localStorage,
});

export const sessionStorageCache = createStorageLikeCache({
  storageLike: sessionStorage,
  support: () => !!window.sessionStorage,
});
