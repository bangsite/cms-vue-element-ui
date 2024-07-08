<template>
  <el-card class="rounded-lg mb-4">
    <template #header>
      <h4 class="title">Basic Usage</h4>
    </template>
    <TableList
      ref="table"
      :columns="columnBasic"
      :data-tables="dataBasic && dataBasic.length > 0 ? dataBasic : []"
      :border="false"
      :custom-class="'table-head-title'"
    />
  </el-card>
  <el-card class="rounded-lg">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Browser State</h4>
        <div class="flex items-center">
          <el-button
            class="rounded-md"
            :type="browserTab === 'today' ? 'primary' : ''"
            @click="handleTabActivation('today')"
            plain
          >
            Today
          </el-button>
          <el-button
            class="rounded-md"
            :type="browserTab === 'week' ? 'primary' : ''"
            @click="handleTabActivation('week')"
            plain
          >
            Week
          </el-button>

          <el-button
            class="rounded-md"
            :type="browserTab === 'month' ? 'primary' : ''"
            @click="handleTabActivation('month')"
            plain
          >
            Month
          </el-button>
        </div>
      </div>
    </template>

    <TableList
      ref="tableBrowserState"
      :columns="columnBrowser"
      :border="false"
      :data-tables="dataBrowser && dataBrowser.length > 0 ? dataBrowser : []"
      :custom-cols="['browser']"
      :custom-class="'table-best-seller'"
      v-loading="isLoading"
    >
      <!-- expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- name -->
      <template #browser="scope">
        <div class="flex items-center gap-1">
          <img :src="`/images/browser/${scope.row.img}`" alt="browser" width="30" />
          <!--          <img v-if="scope.row.img" :src="getImageUrl(`${scope.row.img}`)" alt="browser" width="30" />-->
          <span>{{ scope.row.name }}</span>
        </div>
      </template>
    </TableList>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import TableList from "@/components/tables/TableList.vue";

import { COLUMN_BASIC } from "@/views/table/composables/useColumnBasic";
import { COLUMN_BROWSER_STATE } from "@/views/table/composables/useColumnBrowser";

import { DATA_BASIC_USAGE, DATA_BROWSER_STATE } from "@/db";

const browserTab = ref("today");
const isLoading = ref(false);

const columnBasic = computed(() => COLUMN_BASIC);
const columnBrowser = computed(() => COLUMN_BROWSER_STATE);

const dataBasic = computed(() => DATA_BASIC_USAGE);
const dataBrowser = computed(() => {
  return DATA_BROWSER_STATE && DATA_BROWSER_STATE[browserTab.value].length > 0
    ? DATA_BROWSER_STATE[browserTab.value]
    : [];
});

const handleTabActivation = (value: string) => {
  isLoading.value = true;
  browserTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};
</script>
