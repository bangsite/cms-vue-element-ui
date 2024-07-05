<template>
  <div>
    <!--table body-->
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

    <!-- Pagination slot -->
    <slot name="pagination">
      <div class="my-4" v-if="pagination && Object.keys(pagination).length > 0">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, toRef, watch } from "vue";
import Sortable from "sortablejs";

import SvgIcon from "@/components/common/SvgIcon.vue";
import ColumnRender from "@/components/tables/ColumnRender.vue";

import type { ColumnProps, TableProProps, TypeProps } from "@/types";
import { useTables } from "@/hooks/web/useTables";
import { useSelection } from "@/hooks/web/useSelection";

const props = withDefaults(defineProps<TableProProps>(), {
  columns: () => [],
  customCols: () => [],
  dataTables: () => [],
  border: true,
  rowKey: "id",
});
// const emit = defineEmits<{ search: []; reset: []; dragSort: [{ newIndex?: number; oldIndex?: number }] }>();
const emit = defineEmits(["update:data", "pagination-change", "sort-change", "selection-change", "dragSort"]);

const { tableData, search, handleSizeChange, handleCurrentChange } = useTables();
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"];
const tableColumns = reactive<ColumnProps[]>(props.columns);

const dataTables = toRef(props, "dataTables");
const pagination = toRef(props, "pagination");

onMounted(() => {
  initDragSort();
});

watch(
  () => dataTables,
  (newValue) => {
    dataTables.value = newValue;
  }
);

watch(
  () => pagination,
  (newValue) => {
    pagination.value = newValue;
  }
);

const handlePageChange = (newPage: number) => {
  emit("pagination-change", newPage);
};

const initDragSort = () => {
  const tableBody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
  Sortable.create(tableBody, {
    handle: ".drag__row",
    animation: 300,
    onEnd: ({ newIndex, oldIndex }) => {
      const movedItem = dataTables.value.splice(oldIndex, 1)[0];
      dataTables.value.splice(newIndex, 0, movedItem);
      emit("dragSort", { newIndex, oldIndex });
    },
  });
};

const handleSortChange = (sort: { prop: string; order: "ascending" | "descending" }) => {
  // Handle sort change logic here
  emit("sort-change", sort);
};

const handleSelectionChange = (selection: any[]) => {
  // Handle selection change logic here
  emit("selection-change", selection);
};
</script>
<style>
.el-popper {
  max-width: 50%; /* set the max-width of the tooltip */
}
</style>
