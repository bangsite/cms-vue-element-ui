<template>
  <div>
    <FormSearch
      v-show="isShowSearch"
      @search="onSearch"
      @reset="onReset"
      :searchTitle="'Search Product'"
      :searchColumns="searchColumns"
      :searchParam="searchParam"
    />
    <el-card title="Posts">
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
          <h4 class="title">Product</h4>
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
        <!-- images -->
        <template #product_thumb="scope">
          <el-image style="height: 100px" :src="scope.row.product_thumb" :fit="'cover'" />
        </template>

        <!-- attribute -->
        <template #product_attributes="scope">
          <template v-if="scope.row.product_attributes">
            <div class="flex flex-wrap gap-2">
              <el-tag v-for="(item, idx) in scope.row.product_attributes" :key="idx">{{ item }} </el-tag>
            </div>
          </template>
        </template>

        <!-- operation -->
        <template #operations="scope">
          <el-button type="primary" :icon="EditPen" @click="handleEdit('edit', scope.row)">Edit</el-button>
          <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </TableList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

import TableList from "@/components/tables/TableList.vue";
import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/TableHeader.vue";

import { COLUMN_PRODUCT } from "@/views/product/composables/useColumnProduct";
import { Delete, EditPen, Plus } from "@element-plus/icons-vue";
import { DATA_PRODUCT } from "@/db/dataProduct";

const customCols = reactive(["product_thumb", "product_attributes", "operations"]);
const isShowSearch = ref(true);
const searchParam = ref({});

const columns = computed(() => COLUMN_PRODUCT);
const searchColumns = computed(() => {
  return columns.value?.filter((item) => item?.search?.el).sort((a: any, b: any) => a.search - b.search);
});
const data = computed(() => DATA_PRODUCT);

const handleCreate = () => {};

const handleEdit = (key: string, record: Record<string, any>) => {
  console.log("edit row:", key, record);
};

const handleDelete = (record: Record<string, any>) => {
  console.log("delete row:", record);
};

const onSearch = () => {
  fetchTopAnimes(params.value);
};
const onReset = () => {
  fetchTopAnimes(params.value);
};

const onToggleSearch = (data: boolean) => (isShowSearch.value = data);

const onRefreshData = async () => {};
</script>

<style scoped></style>
