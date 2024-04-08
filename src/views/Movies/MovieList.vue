<template>
  <FormSearch
    v-show="isShowSearch"
    @search="onSearch"
    @reset="onReset"
    :searchColumns="searchColumns"
    :searchParam="searchParam"
    :search-col="searchCol"
  />

  <el-card>
    <TableHeader @toggle-search="onToggleSearch" @refresh-data="onRefreshData" />

    <TableList
      ref="table"
      :columns="columns"
      :data="response"
      :pagination="pagination"
      :init-param="initParam"
      @drag-sort="sortTable"
      v-loading="isLoading"
    >
      <!-- expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- images -->
      <template #images="scope">
        <img :src="scope.row.images.jpg.small_image_url" alt="image" />
      </template>

      <!-- operation -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('check', scope.row)">View</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope.row)" disabled>Edit </el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteRow(scope.row)" disabled>Delete</el-button>
      </template>
    </TableList>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Delete, EditPen, View } from "@element-plus/icons-vue";

import TableList from "@/components/tables/TableList.vue";
import { COLUMNS_ANIME } from "@/views/Movies/composables/useColumn";
import useAnimeJikan from "@/hooks/api/useAnimeJikan";
import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/components/TableHeader.vue";

const isShowSearch = ref(true);
const searchParam = ref({});
const searchCol = reactive({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 });
const initParam = reactive({ type: 1 });
const { fetchTopAnimes, response, pagination, isLoading } = useAnimeJikan();

const columns = computed(() => COLUMNS_ANIME);

onBeforeMount(async () => {
  await fetchTopAnimes();
});

// handle form search
const searchColumns = computed(() => {
  return columns.value?.filter((item) => item.search?.el || item.search?.render).sort((a, b) => a.search - b.search);
});
const onSearch = (val) => {
  // set pageNum= 1
  // updated search param
  // get list
  fetchTopAnimes();
};
const onReset = (val) => {
  // set pageNum= 1
  // updated search param
  // get list
  fetchTopAnimes();
};

// handle tool header
const onRefreshData = async () => await fetchTopAnimes();

const onToggleSearch = (data) => (isShowSearch.value = data);

// handle table
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
  ElMessage.success("Modify list sorting successfully");
};

const openDrawer = (type: string, val: Record<string, any>) => {
  console.log(type, val);
};
const deleteRow = (val: Record<string, any>) => {
  console.log(val);
};
const batchAdd = () => {};
const downloadFile = () => {};
const toDetail = () => {};
const batchDelete = (id: string[]) => {
  console.log(id);
};
</script>
