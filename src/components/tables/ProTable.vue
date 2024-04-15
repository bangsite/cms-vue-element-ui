<template>
  <!--search form-->
  <!--table-->
  <!--table header-->
  <div class="tb-header flex justify-space-between mb-15">
    <!--tool Download, Upload, Delete 1 Row...-->
    <div class="tb-header__left">
      <slot name="tableHeader"></slot>
    </div>

    <!--tool Refresh, Setting, Search-->
    <div class="tb-header__right" v-if="toolButton">
      <slot name="toolButton">
        <el-button :icon="Refresh" circle v-if="showToolButton('refresh')" @click="getTableList" />
        <el-button
          :icon="Operation"
          circle
          v-if="showToolButton('setting') && columns.length"
          @click="openColSetting"
        />
        <el-button
          circle
          :icon="Search"
          v-if="showToolButton('search') && searchColumns?.length"
          @click="isShowSearch = !isShowSearch"
        />
      </slot>
    </div>
  </div>

  <!--table body-->
  <el-table
    ref="tableRef"
    v-bind="$attrs"
    :data="processTableData"
    :border="border"
    :row-key="rowKey"
    @selection-change="selectionChange"
  >
    <!--default slot-->
    <slot />

    <template v-for="item in tableColumns" :key="item">
      <!-- selection || radio || index || expand || sort -->
      <el-table-column
        v-if="item.type && columnTypes.includes(item.type)"
        v-bind="item"
        :align="item.align ?? 'center'"
        :reserve-selection="item.type === 'selection'"
      >
        <template #default="scope">
          <!-- expand -->
          <template v-if="item.type === 'expand'">
            <component :is="item.render" v-bind="scope" v-if="item.render" />
            <slot v-else :name="item.type" v-bind="scope" />
          </template>
          <!-- radio -->
          <el-radio v-if="item.type === 'radio'" v-model="radio" :label="scope.row[rowKey]">
            <i></i>
          </el-radio>
          <!-- sort -->
          <el-link v-if="item.type === 'sort'" :underline="false" class="drag__row">
            <SvgIcon :icon="'carbon:drag-vertical'" />
          </el-link>
        </template>
      </el-table-column>

      <!-- other -->
      <RenderColumn v-if="!item.type && item.prop" :column="item">
        <template v-for="slot in Object.keys($slots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </RenderColumn>
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
  <slot name="pagination">
    <Pagination
      v-if="pagination"
      :pageable="pageable"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
    />
  </slot>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { Operation, Refresh, Search } from "@element-plus/icons-vue";
import Sortable from "sortablejs";

import RenderColumn from "@/components/tables/components/ColumnRender.vue";
import Pagination from "@/components/tables/components/Pagination.vue";

// import type { ColumnProps, ProTableProps, TypeProps } from "@/interfaces/table";
// import { useTables } from "@/hooks/useTables";
// import { useSelection } from "@/hooks/useSelection";
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { ColumnProps, ProTableProps, TypeProps } from "@/interfaces/table.interface";
import { useSelection } from "@/hooks/web/useSelection";

const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  requestAuto: true,
  pagination: false,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: "id",
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});
const emit = defineEmits<{ search: []; reset: []; dragSort: [{ newIndex?: number; oldIndex?: number }] }>();
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTables(props.requestApi, props.initParam, props.pagination, props.dataCallback, props.requestError);
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(props.rowKey);

const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"];
const tableColumns = reactive<ColumnProps[]>(props.columns);
const isShowSearch = ref(true);
const colRef = ref();

const processTableData = computed(() => {
  if (!props.data) return tableData.value;
  if (!props.pagination) return props.data;

  return props.data.slice(
    (pageable.value.pageNum - 1) * pageable.value.pageSize,
    pageable.value.pageSize * pageable.value.pageNum
  );
});

const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter((item) => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!);
});

const flatColumns = computed(() => flatColumnsFunc(tableColumns));

onMounted(() => {
  dragSort();
});
const setEnumMap = async ({ enum: enumValue }: ColumnProps) => {
  if (!enumValue) return;

  // // If the same value exists in the current enumMap return
  // if (enumMap.value.has(prop!) && (typeof enumValue === "function" || enumMap.value.get(prop!) === enumValue)) return;
  //
  // // The current enum is static data and is stored directly in enumMap.
  // if (typeof enumValue !== "function") return enumMap.value.set(prop!, unref(enumValue!));
  //
  // // In order to prevent slow execution of the interface and slow storage, resulting in repeated requests, it is stored as [] in advance, and then stored again after the interface returns.
  // enumMap.value.set(prop!, []);
  //
  // // The current enum is background data and needs to request data, then call the request interface and store it in enumMap
  // const { data } = await enumValue();
  // enumMap.value.set(prop!, data);
};

const colSetting = tableColumns!.filter((item) => {
  const { type, prop, isShow } = item;
  return !columnTypes.includes(type!) && prop !== "operation" && isShow;
});

const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // column adds default isShow && isFilterEnum property value
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    // set enumMap
    await setEnumMap(col);
  });
  return flatArr.filter((item) => !item._children?.length);
};
const openColSetting = () => colRef.value.openColSetting();

// handle tool button
const showToolButton = (key: "refresh" | "setting" | "search") => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton;
};

const dragSort = () => {
  const tbody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
  Sortable.create(tbody, {
    handle: ".drag__row",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = processTableData.value.splice(oldIndex!, 1);
      processTableData.value.splice(newIndex!, 0, removedItem);
      emit("dragSort", { newIndex, oldIndex });
    },
  });
};
</script>
