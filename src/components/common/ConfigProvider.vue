<template>
  <ElConfigProvider :locale="langEl[getLang()]">
    <slot></slot>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useWindowSize } from "@vueuse/core";

import { useLocale } from "@/hooks/useLocale";
import { useAppStore } from "@/stores/app.store";
import { langEl } from "@/enums/locales.enum";

const appStore = useAppStore();
const { width } = useWindowSize();
const { getLang } = useLocale();

// const configTheme = reactive({
//   fontSize: 16,
//   controlHeight: 45,
// });

watch(
  () => width.value,
  (width: number) => {
    if (width < 992) {
      appStore.setCollapse(true);
    }
  },
  {
    immediate: true,
  }
);
</script>
