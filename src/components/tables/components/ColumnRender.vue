<template>
  <el-table-column
    :prop="column.prop"
    :label="column.label"
    :column-key="column.prop"
    :align="column.align ?? 'center'"
    :sortable="column.sortable"
    :show-overflow-tooltip="column.showOverflowTooltip ?? false"
    :width="column.width ?? 'auto'"
    :fixed="column.fixed"
  >
    <template #default="scope">
      <slot v-if="customCols && customCols.includes(column.prop)" :name="column.prop" v-bind="scope" />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import type { ColumnProps } from "@/interfaces/tables";

defineProps<{ column: ColumnProps; customCols?: any[] }>();
</script>

<style scoped></style>
