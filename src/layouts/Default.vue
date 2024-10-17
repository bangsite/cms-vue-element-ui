<template>
  <div class="layout">
    <el-container>
      <el-aside
        :collapsed="collapsed"
        :hide-timeout="3000"
        class="layout__side shadow"
        :width="collapsed ? 'auto' : '250px'"
      >
        <LogoBrand v-if="logo" />

        <VerticalMenu class="side" />
      </el-aside>

      <el-container class="layout__main">
        <el-header class="layout__header">
          <TheHeader />
        </el-header>

        <el-main class="layout__content">
          <MainContent />

          <DynamicDialog v-if="active" />
        </el-main>

        <el-footer v-if="footer" class="layout__footer">
          <TheFooter />
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useAppStore } from "@/stores/app.store";
import { useDialogStore } from "@/stores/dialog.store";

import MainContent from "@/layouts/MainContent.vue";
import TheHeader from "@/components/header/TheHeader.vue";
import TheFooter from "@/components/footer/TheFooter.vue";
import LogoBrand from "@/components/common/LogoBrand.vue";
import VerticalMenu from "@/components/navigation/VerticalMenu.vue";
import DynamicDialog from "@/components/dialog/DynamicDialog.vue";

const appStore = useAppStore();
const { active } = storeToRefs(useDialogStore());

const logo = computed(() => appStore.logo);
const collapsed = computed(() => appStore.getCollapse);
const footer = computed(() => appStore.getFooter);
</script>
