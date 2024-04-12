<template>
  <!--table body-->
  <el-table
    ref="tableBasic"
    v-bind="$attrs"
    :data="processTableData"
    :border="border"
    :row-key="rowKey"
    class="table-best-seller"
  >
    <!--default slot-->
    <slot />

    <template v-for="item in tableColumns" :key="item">
      <!-- other -->
      <ColumnRender v-if="!item.type && item.prop" :column="item" :customCols="customCols">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </ColumnRender>
    </template>

    <!--insert the slot after the last row of the table-->
    <template #append>
      <slot name="append" />
    </template>

    <!--no data-->
    <template #empty>
      <slot name="empty">
        <el-empty description="No data" />
      </slot>
    </template>
  </el-table>

  <!--pagination-->
  <!--  <slot name="pagination">
              <Pagination
                v-if="pagination"
                :pageable="pageable"
                :handle-size-change="handleSizeChange"
                :handle-current-change="handleCurrentChange"
              />
            </slot>-->
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
// import Pagination from "@/components/tables/components/Pagination.vue";
// import type { ColumnProps, ProTableProps } from "@/config/interfaces/table.interface";
import ColumnRender from "@/components/tables/components/ColumnRender.vue";
import type { TableColumn } from "element-plus/es/components/table/src/table-column/defaults";
import type { TableBasicProps } from "@/config/interfaces/table.interface";

const props = withDefaults(defineProps<TableBasicProps>(), {
  columns: () => [],
  data: [],
  pagination: false,
  initParam: {},
  toolButton: true,
  rowKey: "id",
  showOperations: false,
  operationsLabel: "Operations",
  operationsWidth: "120px",
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});
const tableColumns = ref<TableColumn<any>[]>(props.columns);
const processTableData = computed(() => props.data);
const customCols = computed(() => props.customCols);
const showOperations = computed(() => props.showOperations);
const operationsLabel = computed(() => props.operationsLabel);
const operationsWidth = computed(() => props.operationsWidth);
</script>
