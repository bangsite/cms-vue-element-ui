<template>
  <div class="menu-collapse w-50 h-full flex flex-center" @click="toggleCollapse">
    <SvgIcon :icon="'line-md:menu-unfold-left'" :size="20" v-if="collapse" />
    <SvgIcon :icon="'line-md:menu-fold-left'" :size="20" v-else />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";

import SvgIcon from "@/components/SvgIcon.vue";

const appStore = useAppStore();

const collapse = computed(() => appStore.getCollapse);
console.log(collapse);
const toggleCollapse = () => {
  const isCollapsed = collapse.value;
  appStore.setCollapse(!isCollapsed);
};
</script>
