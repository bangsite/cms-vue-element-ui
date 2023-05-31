<template>
  <!--  <div class="layout__side">-->
  <!--    <SideLayout />-->
  <!--  </div>-->
  <el-container class="layout__wrap">
    <el-aside width="250px" class="layout__side">
      <SideLayout />
    </el-aside>
    <el-container class="layout__main">
      <el-header class="layout__header">
        <TheHeader />
      </el-header>

      <el-main class="layout__content">
        <MainContent />
      </el-main>

      <el-footer class="layout__footer">
        <TheFooter v-if="footer" />
      </el-footer>
    </el-container>

    <!--    <section class="b-layout layout__main">-->
    <!--      <div class="layout__header">-->
    <!--        <TheHeader />-->
    <!--      </div>-->
    <!--      <main class="layout__content">-->
    <!--        <MainContent />-->
    <!--      </main>-->
    <!--      <div class="layout__footer">-->
    <!--        <TheFooter v-if="footer" />-->
    <!--      </div>-->
    <!--    </section>-->
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";

import TheHeader from "@/layouts/components/TheHeader.vue";
import MainContent from "@/layouts/components/MainContent.vue";
import SideLayout from "@/layouts/components/SideLayout.vue";
import TheFooter from "@/layouts/components/TheFooter.vue";

const appStore = useAppStore();

const pageLoading = computed(() => appStore.getPageLoading);
const footer = computed(() => appStore.getFooter);
</script>
