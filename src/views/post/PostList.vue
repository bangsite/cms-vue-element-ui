<template>
  <div>
    <FormSearch
      v-show="isShowSearch"
      :search-title="'Search Post'"
      :search-columns="searchPostColumns"
      :search-param="searchParams"
      :search-select-data="searchData"
      @search="onSearch"
      @reset="onResetSearch"
    />

    <el-card title="Posts">
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
          <h4 class="title">Post</h4>
          <el-button type="primary" :icon="Plus" @click="handleCreate">Create</el-button>
        </div>
      </template>

      <TableHeader :tool-button="true" @toggle-search="onToggleSearch" @refresh-data="onRefreshTable" />

      <TableList
        ref="tablePost"
        :columns="postColumns"
        :data-tables="data && data.length > 0 ? data : []"
        :custom-cols="customCols"
        :refreshTables="isRefreshTable"
        @pagination="onPaginationChange"
        @sorted="onSortChange"
      >
        <!-- date -->
        <template #date="scope">
          {{ dateYMD(scope.row.date) }}
        </template>

        <!-- tags -->
        <template #tags="scope">
          <template v-if="scope.row.tags && scope.row.tags.length > 0">
            <div class="flex gap-2">
              <el-tag
                v-for="(item, idx) in scope.row.tags"
                :key="idx"
                :type="idx % 2 === 0 ? 'primary' : 'success'"
                disable-transitions
                >{{ item }}
              </el-tag>
            </div>
          </template>
        </template>

        <!-- operation -->
        <template #operations="scope">
          <div class="flex">
            <el-button type="primary" :icon="EditPen" @click="handleEdit('edit', scope.row)">Edit</el-button>
            <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)">Delete</el-button>
          </div>
        </template>
      </TableList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { Delete, EditPen, Plus } from "@element-plus/icons-vue";

import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/TableHeader.vue";
import TableList from "@/components/tables/TableList.vue";

import { POST_COLUMN, POST_SEARCH_TAGS } from "@/constants/post.contant";
import { DATA_POST } from "@/db";
import useTables from "@/hooks/useTables";
import { dateYMD } from "@/utils/formatDateTime";

const isShowSearch = ref(true);
const searchData = reactive({ tags: POST_SEARCH_TAGS });
const customCols = reactive(["date", "tags", "operations"]);
const initParams = reactive({
  filter: "",
  sort: "desc",
  orderBy: "",
});

const initPaginationParams = reactive({
  page: 1,
  limit: 10,
  pageSize: 10,
  currentPage: 1,
  total: 0,
});

const initSearchParams = reactive({
  type: "",
  rating: "",
});

const { searchParams, isRefreshTable, onSearch, onResetSearch, onRefreshTable, onPaginationChange, onSortChange } =
  useTables(undefined, initParams, initSearchParams, initPaginationParams);
const data = computed(() => DATA_POST);
const postColumns = computed(() => POST_COLUMN);
const searchPostColumns = computed(() => {
  return postColumns.value?.filter((item) => item?.search?.el).sort((a: any, b: any) => a.search - b.search);
});

const onToggleSearch = (data: boolean) => (isShowSearch.value = data);

const handleCreate = () => {};

const handleEdit = (key: string, record: Record<string, any>) => {
  console.log("edit row:", key, record);
};

const handleDelete = (record: Record<string, any>) => {
  console.log("delete row:", record);
};
</script>

<style scoped></style>
