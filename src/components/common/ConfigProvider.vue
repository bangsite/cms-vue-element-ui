<template>
  <ElConfigProvider :locale="currentLocale.elLocale" :theme="{ token: { ...configTheme } }">
    <slot></slot>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useAppStore } from "@/stores/app.store";
import { useLocaleStore } from "@/stores/locale.store";

const appStore = useAppStore();
const localeStore = useLocaleStore();
const { width } = useWindowSize();

const currentLocale = computed(() => localeStore.currentLocale) as object;

const configTheme = reactive({
  fontSize: 16,
  controlHeight: 45,
});

onMounted(() => {});

watch(
  () => width.value,
  (width: number) => {
    if (width < 768) {
      appStore.setCollapse(true);
      appStore.getLayout !== "default" ? appStore.setLayout("topLeft") : undefined;
    } else {
      appStore.setLayout("default");
    }
  },
  {
    immediate: true,
  }
);
</script>
