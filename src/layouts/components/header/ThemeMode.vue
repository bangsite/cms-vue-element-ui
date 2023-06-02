<template>
  <ElTooltip placement="bottom" trigger="hover" effect="dark">
    <template #content>
      <span>Theme mode</span>
    </template>
    <SwitchDarkMode :dark="theme" @update:dark="themeChange" />
  </ElTooltip>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { useAppStore } from "@/core/stores/modules/app.store";
import SwitchDarkMode from "@/components/Common/SwitchDarkMode.vue";

const appStore = useAppStore();

const theme = computed(() => appStore.getIsDark);
const themeChange = (val) => {
  appStore.setIsDark(val as boolean);
};
</script>

<style scoped></style>
