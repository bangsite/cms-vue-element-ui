<template>
  <div class="tb-header flex justify-between mb-4">
    <!--tool Download, Upload, Delete 1 Row-->
    <div class="tb-header__left">
      <el-button type="primary" :icon="Download" plain @click="downloadFile"> Export data</el-button>
    </div>

    <!--tool Refresh, Setting, Search-->
    <div class="tb-header__right" v-if="toolButton">
      <slot name="toolButton">
        <el-button :icon="Refresh" circle @click="refreshData" />
        <el-button :icon="Operation" circle />
        <el-button circle :icon="Search" @click="toggleSearch" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Download, Operation, Refresh, Search } from "@element-plus/icons-vue";
import type { TableHeaderProps } from "@/types";

withDefaults(defineProps<TableHeaderProps>(), {
  toolButton: true,
});

const emits = defineEmits(["downloadFile", "refreshData", "openColSetting", "toggleSearch"]);
const isShowSearch = ref(true);

const downloadFile = () => {
  emits("downloadFile", true);
};

const refreshData = () => {
  emits("refreshData", true);
};

const toggleSearch = () => {
  isShowSearch.value = !isShowSearch.value;
  emits("toggleSearch", isShowSearch.value);
};
</script>

<style lang="scss" scoped></style>
