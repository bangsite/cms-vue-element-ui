<template>
  <div class="header">
    <div class="header__left">
      <TheCollapse v-if="hamburger && layout !== 'cutMenu'" />
      <TheBreadcrumb v-if="breadcrumb"></TheBreadcrumb>
    </div>

    <div class="header__right">
      <FullScreen />
      <ThemeMode />
      <LangSwitch />
      <SystemMessage />
      <UserInfo />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import TheCollapse from "@/layouts/components/TheCollapse.vue";
import TheBreadcrumb from "@/layouts/components/TheBreadcrumb.vue";
import LangSwitch from "@/layouts/components/header/LangSwitch.vue";
import ThemeMode from "@/layouts/components/header/ThemeMode.vue";

import UserInfo from "@/layouts/components/UserInfo.vue";

import { useAppStore } from "@/core/stores/modules/app.store";
import FullScreen from "@/layouts/components/header/FullScreen.vue";
import SystemMessage from "@/layouts/components/header/SystemMessage.vue";

const appStore = useAppStore();

const hamburger = computed(() => appStore.getHamburger);
const breadcrumb = computed(() => appStore.getBreadcrumb);
const layout = computed(() => appStore.getLayout);
</script>
