<template>
  <FormSearch
    v-show="isShowSearch"
    @search="onSearch"
    @reset="onReset"
    :searchColumns="searchColumns"
    :searchParam="searchParam"
    :search-select-data="ANIME_SEARCH_TYPE"
  />

  <el-card>
    <TableHeader @toggle-search="onToggleSearch" @refresh-data="onRefreshData" />

    <TableList
      ref="table"
      :columns="columns"
      :data-tables="response && response.length > 0 ? response : []"
      :custom-cols="customCols"
      :pagination="paginationAPI"
      @drag-sort="sortTable"
      @pagination-change="onPaginationChange"
      v-loading="isLoading"
    >
      <!-- images -->
      <template #images="scope">
        <img :src="scope.row.images?.jpg?.small_image_url" alt="image" />
      </template>

      <!-- operation -->
      <template #operations="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('check', scope.row)">View</el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope.row)" disabled>Edit </el-button>
        <el-button type="danger" link :icon="Delete" @click="deleteRow(scope.row)" disabled>Delete</el-button>
      </template>
    </TableList>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Delete, EditPen, View } from "@element-plus/icons-vue";

import useAnimeJikan from "@/hooks/api/useAnimeJikan";

import { ANIME_SEARCH_TYPE } from "@/enums/anime.enum";
import { COLUMNS_ANIME } from "@/views/movies/composables/useColumn";

import TableList from "@/components/tables/TableList.vue";
import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/components/TableHeader.vue";

const isShowSearch = ref(true);
const searchParam = ref({});
const customCols = reactive(["images", "operations"]);
const initParams = reactive({
  type: "",
  filter: "",
  sort: "",
  order_by: "",
  rating: "",
  page: 1,
  limit: 10,
});
const params = ref({ ...initParams });

const columns = computed(() => COLUMNS_ANIME);

const { fetchTopAnimes, response, paginationAPI, isLoading } = useAnimeJikan();
console.log(paginationAPI.value);

onBeforeMount(async () => {
  await fetchTopAnimes(params.value);
});

// handle form search
const searchColumns = computed(() => {
  return columns.value?.filter((item) => item?.search?.el).sort((a: any, b: any) => a.search - b.search);
});

const onSearch = () => {
  // set pageNum= 1
  // updated search param
  // get list
  fetchTopAnimes(params.value);
};
const onReset = () => {
  // set pageNum= 1
  // updated search param
  // get list
  fetchTopAnimes(params.value);
};

// handle tool header
const onRefreshData = async () => {
  response.value = [];
  params.value = { ...initParams };

  await fetchTopAnimes(params.value);
};

const onPaginationChange = (newPage: number) => {
  console.log("onPaginationChange:::", newPage);
  params.value.page = newPage;

  fetchTopAnimes(params.value);
};

const onToggleSearch = (data: boolean) => (isShowSearch.value = data);

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
