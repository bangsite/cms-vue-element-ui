<script setup lang="ts">
import type { ColumnProps } from "@/interfaces/table.interface";
const props = defineProps<{ column: ColumnProps; customCols: string[] }>();
</script>

<template>
  <template v-if="column.prop !== 'actions'">
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
        <template v-if="customCols.includes(column.prop)">
          <slot :name="column.prop" v-bind="scope" />
        </template>
      </template>
    </el-table-column>
  </template>
  <template v-else>
    <!-- dynamic operation column -->
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
        <template v-if="column.prop === 'actions'">
          <slot :name="column.prop" v-bind="scope" />
        </template>
      </template>
    </el-table-column>
  </template>
</template>

<style scoped></style>
