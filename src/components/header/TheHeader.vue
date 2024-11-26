<template>
  <div class="flex items-center justify-between w-full h-full">
    <div class="flex items-center">
      <MenuCollapse />
      <!-- <TheBreadcrumb v-if="breadcrumb"></TheBreadcrumb>-->
    </div>

    <div class="flex items-center gap-1">
      <FullScreen />
      <ThemeMode />
      <LangSwitch />
      <SystemMessage />
      <UserInfo />
    </div>
  </div>
</template>
<script setup lang="ts">
import MenuCollapse from "@/components/header/MenuCollapse.vue";
import FullScreen from "@/components/header/FullScreen.vue";
import SystemMessage from "@/components/header/SystemMessage.vue";
import LangSwitch from "@/components/header/LangSwitch.vue";
import ThemeMode from "@/components/header/ThemeMode.vue";
import UserInfo from "@/components/header/UserInfo.vue";
</script>
