<template>
  <el-card class="mb-15">
    <template #header>Search Movie</template>
  </el-card>
  <el-card>
    <BasicTable
      ref="proTable"
      :columns="columns"
      :data="response"
      :pagination="pagination"
      :init-param="initParam"
      @drag-sort="sortTable"
      v-loading="isLoading"
    >
      <!--table header button-->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="Download" plain @click="downloadFile"> Export data </el-button>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
          @click="batchDelete(scope.selectedListIds)"
        >
          Delete data selected
        </el-button>
      </template>

      <!-- expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- images -->
      <template #images="scope">
        <img :src="scope.row.images[2].url" :width="scope.row.images[2].height" alt="" />
      </template>

      <!-- operation -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('check', scope.row)">View</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope.row)" disabled>Edit </el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteRow(scope.row)" disabled>Delete</el-button>
      </template>
    </BasicTable>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Delete, Download, EditPen, View } from "@element-plus/icons-vue";

import BasicTable from "@/components/tables/TableList.vue";
import useAnimeJikan from "@/hooks/api/useAnimeJikan";
import { COLUMNS_ANIME } from "@/views/movies/composables/useColumn";

const initParam = reactive({ type: 1 });

const columns = computed(() => COLUMNS_ANIME);

const { fetchTopAnimes, response, pagination, isLoading } = useAnimeJikan();

onBeforeMount(async () => {
  await fetchTopAnimes();
});

const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  ElMessage.success("Modify list sorting successfully");
};

const openDrawer = (type: string, dataRow: any) => {
  console.log(type, dataRow);
};
const deleteRow = (dataRow: any) => {
  console.log(dataRow);
};
const batchAdd = () => {};
const downloadFile = () => {};
const toDetail = () => {};
const batchDelete = (id: string[]) => {
  console.log(id);
};
</script>
