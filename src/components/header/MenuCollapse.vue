<template>
  <div class="menu-collapse w-50px h-full flex flex-center" @click="toggleCollapse">
    <SvgIcon :icon="'line-md:menu-unfold-left'" :size="22" v-if="collapse" />
    <SvgIcon :icon="'line-md:menu-fold-left'" :size="22" v-else />
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/app.store";

import SvgIcon from "@/components/common/SvgIcon.vue";

const appStore = useAppStore();

const collapse = computed(() => appStore.getCollapse);

const toggleCollapse = () => {
  appStore.setCollapse(!collapse.value);
};
</script>
