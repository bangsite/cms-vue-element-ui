<script setup lang="ts">
import { RouterView } from "vue-router";
import { useCache } from "@/hooks/web/useCache";
import { useAppStore } from "./core/stores/modules/app";
import { isDark } from "./shared/utils/is";

import { createCacheModel, storageLikeDriver } from "./plugins/web-store-cache";
const localStorageCache = createCacheModel(storageLikeDriver(localStorage));
localStorageCache.set("foo", "bar");
const appStore = useAppStore();
const { wsCache } = useCache();

const setDefaultTheme = () => {
  if (wsCache.get("isDark") !== null) {
    appStore.setIsDark(wsCache.get("isDark"));
    return;
  }
  const isDarkTheme = isDark();
  appStore.setIsDark(isDarkTheme);
};

setDefaultTheme();
</script>

<template>
  <RouterView />
</template>
