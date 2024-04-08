<template>
  <div class="header">
    <div class="header__left">
      <MenuCollapse />
      <!-- <TheBreadcrumb v-if="breadcrumb"></TheBreadcrumb>-->
    </div>

    <div class="header__right">
      <!--      <SearchModal />-->
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
// import TheBreadcrumb from "@/components/header/TheBreadcrumb.vue";
import MenuCollapse from "@/components/header/MenuCollapse.vue";
import FullScreen from "@/components/header/FullScreen.vue";
import SystemMessage from "@/components/header/SystemMessage.vue";
import LangSwitch from "@/components/header/LangSwitch.vue";
import ThemeMode from "@/components/header/ThemeMode.vue";
import UserInfo from "@/components/header/UserInfo.vue";
// import SearchModal from "@/components/header/SearchModal.vue";

import { useAppStore } from "@/stores/app.store";

const appStore = useAppStore();

const hamburger = computed(() => appStore.getHamburger);
const breadcrumb = computed(() => appStore.getBreadcrumb);
const layout = computed(() => appStore.getLayout);
</script>
