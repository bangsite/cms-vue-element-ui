<script setup lang="ts">
import { useSlots } from "vue";
import type { ColumnProps } from "@/config/interfaces/table.interface";

defineProps<{ column: ColumnProps }>();
const slots = useSlots();

function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

console.log(slots);
</script>

<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :align="column.align ?? 'center'"
    :sortable="column.sortable"
    :show-overflow-tooltip="column.showOverflowTooltip"
    :width="column.width ?? 'auto'"
    :fixed="column.fixed"
  >
    <template #default="scope">
      <!-- images -->
      <template v-if="column.prop === 'images'">
        <slot :name="column.prop" v-bind="scope" />
      </template>
      <template v-if="column.prop === 'operation'">
        <slot :name="column.prop" v-bind="scope" />
      </template>
    </template>
  </el-table-column>
</template>

<style scoped></style>
