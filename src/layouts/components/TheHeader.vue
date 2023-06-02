<template>
  <div class="header">
    <div class="header__left">
      <MenuCollapse />
      <TheBreadcrumb v-if="breadcrumb"></TheBreadcrumb>
    </div>

    <div class="header__right">
      <SearchView />
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

import TheBreadcrumb from "@/layouts/components/TheBreadcrumb.vue";
import MenuCollapse from "@/layouts/components/header/MenuCollapse.vue";
import SearchView from "@/components/Search/SearchView.vue";
import FullScreen from "@/layouts/components/header/FullScreen.vue";
import SystemMessage from "@/layouts/components/header/SystemMessage.vue";
import LangSwitch from "@/layouts/components/header/LangSwitch.vue";
import ThemeMode from "@/layouts/components/header/ThemeMode.vue";
import UserInfo from "@/layouts/components/UserInfo.vue";

import { useAppStore } from "@/core/stores/modules/app.store";

const appStore = useAppStore();

const hamburger = computed(() => appStore.getHamburger);
const breadcrumb = computed(() => appStore.getBreadcrumb);
const layout = computed(() => appStore.getLayout);
</script>
