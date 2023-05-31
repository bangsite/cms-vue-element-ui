<template>
  <div class="side">
    <div class="side__wrap">
      <TheLogo v-if="logo" />
      <TheNavigation />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";

import TheLogo from "@/components/TheLogo.vue";
import TheNavigation from "@/layouts/components/TheNavigation.vue";

const appStore = useAppStore();

const logo = computed(() => appStore.logo);
</script>
