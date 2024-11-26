<template>
  <div>
    <FormSearch
      v-show="isShowSearch"
      :searchTitle="'Search Product'"
      :searchColumns="searchProductColumns"
      :searchParam="searchParams"
      :search-select-data="searchData"
      @search="onSearch"
      @reset="onResetSearch"
    />
    <el-card title="Posts">
      <template #header>
        <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
          <h4 class="title">Product</h4>
          <el-button type="primary" :icon="Plus" @click="handleCreate">Create</el-button>
        </div>
      </template>

      <TableHeader :tool-button="true" @toggle-search="onToggleSearch" @refresh-data="onRefreshTable" />

      <TableList
        ref="tableProduct"
        v-loading="isLoading"
        :columns="productColumns"
        :data-tables="response && response.length > 0 ? response : []"
        :custom-cols="customCols"
        :pagination="paginationAPI"
        :refreshTables="isRefreshTable"
        @pagination="onPaginationChange"
        @sorted="onSortChange"
      >
        <!-- images -->
        <template #product_thumb="scope">
          <el-image
            v-if="scope.row.product_thumb"
            style="height: 100px"
            :src="scope.row.product_thumb"
            :fit="'cover'"
          />
        </template>

        <!-- attribute -->
        <template #product_attributes="scope">
          <template v-if="scope.row.product_attributes">
            <div class="flex flex-wrap gap-2">
              <el-tag v-for="(item, idx) in scope.row.product_attributes" :key="idx">{{ item }}</el-tag>
            </div>
          </template>
        </template>

        <!-- operation -->
        <template #operations="scope">
          <div class="flex">
            <el-button type="primary" :icon="EditPen" @click="handleEdit('edit', scope.row)">Edit </el-button>
            <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)">Delete</el-button>
          </div>
        </template>
      </TableList>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { Delete, EditPen, Plus } from "@element-plus/icons-vue";

import FormSearch from "@/components/form/FormSearch.vue";
import TableHeader from "@/components/tables/TableHeader.vue";
import TableList from "@/components/tables/TableList.vue";

import useTables from "@/hooks/useTables";
import useProduct from "@/hooks/api/useProduct";
import { PRODUCT_COLUMN, PRODUCT_SEARCH_TYPE } from "@/constants/product.contant";

const isShowSearch = ref(true);
const searchData = reactive({ product_type: PRODUCT_SEARCH_TYPE });
const customCols = reactive(["product_thumb", "product_attributes", "operations"]);

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
  product_type: "",
});

const { fetchListProduct, response, paginationAPI, isLoading } = useProduct();
const {
  params,
  paginationParams,
  searchParams,
  isRefreshTable,
  onSearch,
  onResetSearch,
  onRefreshTable,
  onPaginationChange,
  onSortChange,
} = useTables(fetchListProduct, initParams, initSearchParams, initPaginationParams);

const productColumns = computed(() => PRODUCT_COLUMN);
const searchProductColumns = computed(() => {
  return productColumns.value?.filter((item) => item?.search?.el).sort((a: any, b: any) => a.search - b.search);
});

onBeforeMount(async () => {
  await fetchListProduct({ ...params, ...paginationParams });
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
