<template>
  <div>
    <FormSearch
      v-show="isShowSearch"
      @search="onSearch"
      @reset="onReset"
      :searchTitle="searchTitle"
      :searchColumns="searchColumns"
      :searchParam="searchParam"
      :search-select-data="ANIME_SEARCH_TYPE"
    />
    <el-card title="Posts">
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
          <h4 class="title">Post</h4>
          <el-button type="primary" :icon="Plus" @click="handleCreate">Create</el-button>
        </div>
      </template>

      <TableHeader :tool-button="true" @toggle-search="onToggleSearch" @refresh-data="onRefreshData" />

      <TableList
        ref="tablePost"
        :columns="columns"
        :data-tables="data && data.length > 0 ? data : []"
        :custom-cols="customCols"
      >
        <!-- date -->
        <template #date="scope">
          {{ dateTime(scope.row.date) }}
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
import TableList from "@/components/tables/TableList.vue";

import { COLUMN_POST } from "@/views/post/composables/useColumnPost";
import { DATA_POST } from "@/db";
import { Delete, EditPen, Plus } from "@element-plus/icons-vue";
import { dateTime } from "@/utils/formatDateTime";
import { ANIME_SEARCH_TYPE } from "@/enums/anime.enum";
import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/TableHeader.vue";

const customCols = reactive(["date", "tags", "operations"]);
const isShowSearch = ref(true);
const searchTitle = ref("Search Post");
const searchParam = ref({});

const columns = computed(() => COLUMN_POST);
const data = computed(() => DATA_POST);
const searchColumns = computed(() => {
  return columns.value?.filter((item) => item?.search?.el).sort((a: any, b: any) => a.search - b.search);
});

const handleCreate = () => {};

const handleEdit = (key: string, record: Record<string, any>) => {
  console.log("edit row:", key, record);
};

const handleDelete = (record: Record<string, any>) => {
  console.log("delete row:", record);
};

const onSearch = () => {};

const onReset = () => {};

const onToggleSearch = (data: boolean) => (isShowSearch.value = data);

const onRefreshData = async () => {};
</script>

<style scoped></style>
