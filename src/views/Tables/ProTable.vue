<template>
  <el-card>
    <ProTable
      ref="proTable"
      :columns="columns"
      :data="response"
      :init-param="initParam"
      :data-callback="dataCallback"
      @drag-sort="sortTable"
    >
      <!--table header button-->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('new')">Create</el-button>
        <el-button type="primary" :icon="Download" plain @click="downloadFile">Export data</el-button>
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

      <!-- operation -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('check', scope.row)">View</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope.row)">Edit</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteRow(scope.row)">Delete</el-button>
      </template>
    </ProTable>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";

import { COLUMNS_PRO } from "@/views/Tables/useColumns";
import ProTable from "@/components/tables/ProTable.vue";

import type { ColumnProps } from "@/core/interfaces/table";
import useBooking from "@/composables/useBooking";

const initParam = reactive({ type: 1 });

const columns = computed((): ColumnProps => COLUMNS_PRO);

const { fetchListHotels, response, isLoading } = useBooking();

onBeforeMount(async () => {
  await fetchListHotels();

  if (response.value) {
    response.value = response.value.filter((item, idx) => idx < 15) || [];
  }
});

const dataCallback = (data: any) => {
  return {
    list: data?.list || data?.result,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
  };
};

const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  console.log(newIndex, oldIndex);
  ElMessage.success("Modify list sorting successfully");
};

const openDrawer = () => {};
const deleteRow = () => {};
const batchAdd = () => {};
const downloadFile = () => {};
const toDetail = () => {};
const batchDelete = (id: string[]) => {
  console.log(id);
};
</script>
<style lang="scss">
.el-popper {
  max-width: 30rem;
}
</style>
