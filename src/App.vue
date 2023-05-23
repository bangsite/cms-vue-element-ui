<script setup lang="ts">
import { RouterView } from "vue-router";
import { useCache } from "@/hooks/web/useCache";
import { useAppStore } from "./core/stores/modules/app";
import { isDark } from "./shared/utils/is";

const appStore = useAppStore();
const { wsCache } = useCache();

const setDefaultTheme = () => {
  if (wsCache.getItem("isDark") !== null) {
    appStore.setIsDark(wsCache.getItem("isDark"));
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
