<template>
  <div>
    <FormSearch
      v-show="isShowSearch"
      :search-title="'Search Animes'"
      :search-columns="searchColumns"
      :search-param="searchParams"
      :search-select-data="searchData"
      @search="onSearch"
      @reset="onResetSearch"
    />

    <el-card class="rounded-md">
      <TableHeader :tool-button="true" @toggle-search="onToggleSearch" @refresh-data="onRefreshTable" />
      <DraggablePlus
        v-model="response"
        @start="onStart"
        @end="onEnd"
        animation="150"
        target=".el-table__body-wrapper tbody"
      >
        <TableList
          ref="table"
          :columns="columns"
          :data-tables="response && response.length > 0 ? response : []"
          :custom-cols="customCols"
          :pagination="paginationAPI"
          :refreshTables="isRefreshTable"
          @pagination="onPaginationChange"
          @sorted="onSortChange"
          v-loading="isLoading"
        >
          <!-- images -->
          <template #images="scope">
            <img :src="scope.row.images?.jpg?.small_image_url" alt="image" />
          </template>

          <!-- operation -->
          <template #operations="scope">
            <div class="flex items-center">
              <el-button type="primary" link :icon="View" @click="openDrawer('check', scope.row)">View </el-button>
              <el-button type="primary" link :icon="EditPen" @click="openDrawer('edit', scope.row)" disabled>
                Edit
              </el-button>
              <el-button type="danger" link :icon="Delete" @click="deleteRow(scope.row)" disabled>Delete </el-button>
            </div>
          </template>
        </TableList>
      </DraggablePlus>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Delete, EditPen, View } from "@element-plus/icons-vue";
import { type SortableEvent } from "vue-draggable-plus";

import useAnimeJikan from "@/hooks/api/useAnimeJikan";

import { ANIME_SEARCH_RANK, ANIME_SEARCH_TYPE } from "@/enums/anime.enum";
import { COLUMN_ANIME } from "@/views/table/composables/useColumnAnime";

import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/TableHeader.vue";
import TableList from "@/components/tables/TableList.vue";
import useTables2 from "@/hooks/useTables2";

const isShowSearch = ref(true);
const searchData = reactive({ type: ANIME_SEARCH_TYPE, rating: ANIME_SEARCH_RANK });
const customCols = reactive(["images", "operations"]);
const initParams = reactive({
  filter: "",
  sort: "desc",
  orderBy: "",
});

const initPaginationParams = reactive({
  page: 1,
  limit: 10,
  pageSize: 10,
});

const initSearchParams = reactive({
  type: "",
  rating: "",
});
const { fetchTopAnimes, response, paginationAPI, isLoading } = useAnimeJikan();
const {
  columns,
  params,
  paginationParams,
  searchParams,
  isRefreshTable,
  onSearch,
  onResetSearch,
  onRefreshTable,
  onPaginationChange,
  onSortChange,
} = useTables2(fetchTopAnimes, initParams, initSearchParams, initPaginationParams);

// const columns = computed(() => COLUMN_ANIME);
// handle form search
const searchColumns = computed(() => {
  return columns.value?.filter((column) => column?.search?.el).sort((a: any, b: any) => a.search - b.search);
});

onBeforeMount(async () => {
  await fetchTopAnimes({ ...params, ...paginationParams });
});

const onToggleSearch = (data: boolean) => (isShowSearch.value = data);

const openDrawer = (type: string, val: Record<string, any>) => {
  console.log(type, val);
};
const deleteRow = (val: Record<string, any>) => {
  console.log(val);
};

const onStart = (event: SortableEvent) => {
  console.log("start drag", event);
};

const onEnd = (event: SortableEvent) => {
  console.log("end drag", event);
  ElMessage.success("Modify list row change successfully");
};
</script>
