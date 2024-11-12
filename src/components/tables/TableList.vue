<template>
  <div>
    <!--table body-->
    <DraggablePlus
      v-model="tableColumns"
      @start="onStart"
      @end="onEnd"
      animation="150"
      target=".el-table__header thead tr"
    >
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :data="dataTables"
        :default-sort="defaultSort"
        :border="border"
        :row-key="rowKey"
        :class="customClass"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <!-- Default slot for custom columns -->
        <slot />

        <template v-for="item in tableColumns" :key="item.prop || item.type">
          <!-- selection || radio || index || expand || sort -->
          <el-table-column
            v-if="item.type && columnTypes.includes(item.type)"
            v-bind="item"
            :align="item.align ?? 'center'"
            :reserve-selection="item.type === 'selection'"
            class="sort-header"
          >
            <template #default="scope">
              <!-- expand -->
              <component v-if="item.type === 'expand' && item.render" :is="item.render" v-bind="scope" />
              <slot v-else-if="item.type === 'expand'" :name="item.type" v-bind="scope" />
              <!-- sort -->
              <el-link v-else-if="item.type === 'sort'" :underline="false" class="drag__row">
                <SvgIcon :icon="'carbon:drag-vertical'" />
              </el-link>
              <!-- radio -->
              <el-radio v-else-if="item.type === 'radio'" v-model="item.radio" :label="scope.row[rowKey]">
                <i></i>
              </el-radio>
            </template>
          </el-table-column>

          <!-- Handle custom columns -->
          <ColumnRender v-else :column="item" :custom-cols="customCols">
            <template v-for="slot in Object.keys($slots)" #[slot]="scope">
              <slot :name="slot" v-bind="scope" />
            </template>
          </ColumnRender>
        </template>

        <!-- Append slot for custom content after the table rows -->
        <template #append>
          <slot name="append" />
        </template>

        <!-- Empty state slot -->
        <template #empty>
          <slot name="empty">
            <el-empty description="No data" />
          </slot>
        </template>
      </el-table>
    </DraggablePlus>

    <!-- Pagination slot -->
    <slot name="pagination">
      <div class="my-4" v-if="pagination && Object.keys(pagination).length > 0 && pagination.total > 1">
        <el-pagination
          :current-page="pagination?.currentPage || 1"
          :page-size="pagination?.pageSize || 10"
          :total="parseInt(pagination.total)"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef, watch } from "vue";

import SvgIcon from "@/components/common/SvgIcon.vue";
import ColumnRender from "@/components/tables/ColumnRender.vue";

import type { ColumnProps, TableProProps, TypeProps } from "@/types";
import { type SortableEvent } from "vue-draggable-plus";
// import { useSelection } from "@/hooks/useSelection";

const props = withDefaults(defineProps<TableProProps>(), {
  columns: () => [],
  customCols: () => [],
  dataTables: () => [],
  border: true,
  rowKey: "id",
  refreshTables: false,
});
const emit = defineEmits(["pagination", "sorted", "selection"]);

const dataTables = toRef(props, "dataTables");
const pagination = toRef(props, "pagination");
const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"];
const tableColumns = ref<ColumnProps[]>(props?.columns || []);

// const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);
const handleSizeChange = (newPageSize: number) => {
  // pageSize.value = newPageSize;
  emit("pagination", { pageSize: newPageSize });
};

const handlePageChange = (newPage: number) => {
  // currentPage.value = newPage;
  emit("pagination", { currentPage: newPage });
};

const handleSortChange = (sort: { prop: string; order: "ascending" | "descending" }) => {
  // Handle sort change logic here
  emit("sorted", sort);
};

const handleSelectionChange = (selection: any[]) => {
  // Handle selection change logic here
  emit("selection", selection);
};

const onStart = (event: SortableEvent) => {
  console.log("start drag", event);
};

const onEnd = (event: SortableEvent) => {
  console.log("end drag", event);
};

watch(
  () => props.refreshTables,
  () => {
    tableColumns.value = [...props.columns];
  }
);
</script>
<style lang="scss">
.el-popper {
  max-width: 50%; /* set the max-width of the tooltip */
}
</style>
