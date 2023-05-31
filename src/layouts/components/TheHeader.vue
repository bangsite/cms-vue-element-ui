<template>
  <div class="header">
    <div class="header__left">
      <TheCollapse v-if="hamburger && layout !== 'cutMenu'" />
      <TheBreadcrumb v-if="breadcrumb"></TheBreadcrumb>
    </div>

    <div class="header__right">
      <TheLanguage />
      <UserInfo />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import TheCollapse from "@/layouts/components/TheCollapse.vue";
import TheBreadcrumb from "@/layouts/components/TheBreadcrumb.vue";
import TheLanguage from "@/layouts/components/TheLanguage.vue";
import UserInfo from "@/layouts/components/UserInfo.vue";

import { useAppStore } from "@/core/stores/modules/app.store";

const appStore = useAppStore();

const hamburger = computed(() => appStore.getHamburger);
const breadcrumb = computed(() => appStore.getBreadcrumb);
const layout = computed(() => appStore.getLayout);
</script>
