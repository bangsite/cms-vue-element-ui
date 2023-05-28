<template>
  <ElConfigProvider :namespace="elNamespace" :locale="currentLocale.elLocale" :message="{ max: 1 }" :size="size">
    <slot></slot>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { provide, computed, watch, onMounted, ref } from "vue";
import { useWindowSize } from "@vueuse/core";

import { useAppStore } from "@/core/stores/modules/app.store";
import { useLocaleStore } from "@/core/stores/modules/locale.store";
import { useDesign } from "@/hooks/web/useDesign";

import { propTypes } from "@/shared/utils/propTypes";

import type { ElementPlusSize } from "@/types/elementPlus";
import { setCssVar } from "@/shared/utils/setCssVar";

const appStore = useAppStore();
const localeStore = useLocaleStore();
const { variables } = useDesign();
const { width } = useWindowSize();

const currentLocale = computed(() => localeStore.currentLocale);
const props = defineProps({
  size: propTypes.oneOf<ElementPlusSize>(["default", "small", "large"]).def("default"),
});

const elNamespace = ref(variables?.elNamespace || "el");

provide("configGlobal", props);

onMounted(() => {
  appStore.setCssVarTheme();
});

watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      !appStore.getMobile ? appStore.setMobile(true) : undefined;
      setCssVar("--left-menu-min-width", "0");
      appStore.setCollapse(true);
      appStore.getLayout !== "classic" ? appStore.setLayout("classic") : undefined;
    } else {
      appStore.getMobile ? appStore.setMobile(false) : undefined;
      setCssVar("--left-menu-min-width", "64px");
    }
  },
  {
    immediate: true,
  }
);
</script>
