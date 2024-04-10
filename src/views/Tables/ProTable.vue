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
      <!--      <template #tableHeader="scope">-->
      <!--        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('new', scope.row)">Create</el-button>-->
      <!--        <el-button type="primary" :icon="Download" plain @click="downloadFile">Export data</el-button>-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          :icon="Delete"-->
      <!--          plain-->
      <!--          :disabled="!scope?.isSelected || false"-->
      <!--          @click="batchDelete(scope?.selectedListIds || '')"-->
      <!--        >-->
      <!--          Delete data selected-->
      <!--        </el-button>-->
      <!--      </template>-->

      <!-- expand -->
      <el-table-column type="expand">
        <template #default="scope">
          {{ scope?.row }}
        </template>
      </el-table-column>

      <!-- operation -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('check', scope?.row)">View </el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope?.row)">Edit </el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteRow(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </ProTable>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlus, Delete, Download, EditPen, View } from "@element-plus/icons-vue";

import { ColumnProps } from "@/views/Tables/useColumns";
import ProTable from "@/components/tables/ProTable.vue";

import useBooking from "@/composables/useBooking";

const initParam = reactive({ type: 1 });

const columns = computed(() => ColumnProps);

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
  ElMessage.success("Modify list sorting successfully");
};

const openDrawer = (type: string, dataRow: any) => {
  console.log(type, dataRow);
};
const deleteRow = (dataRow: any) => {
  console.log(dataRow);
};
const batchAdd = (type: string, dataRow: any) => {
  console.log(type, dataRow);
};
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
