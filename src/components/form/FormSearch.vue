<template>
  <el-card class="mb-15">
    <template #header>Search Movie</template>

    <el-form ref="formRef" :model="searchParam">
      <div class="grid">
        <el-form-item
          v-for="(item, index) in searchColumns"
          :key="item.prop"
          :index="index"
          :label="`${item.search?.label ?? item.label}`"
        >
          <el-input v-model="item.prop" />
        </el-form-item>
        <div class="operation">
          <el-button :icon="Delete" @click="handleReset">Reset</el-button>
          <el-button type="primary" :icon="Search" @click="handleSearch">Search</el-button>
        </div>
      </div>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { Delete, Search } from "@element-plus/icons-vue";
import type { BreakPoint } from "@/config/interfaces/responsive.interface";
import type { ColumnProps } from "@/config/interfaces/table.interface";

interface ProTableProps {
  searchColumns?: ColumnProps[];
  searchParam?: { [key: string]: any };
  searchCol: number | Record<BreakPoint, number>;
}

const props = withDefaults(defineProps<ProTableProps>(), {
  searchColumns: () => [],
  searchParam: () => ({}),
});

console.log(props.searchColumns);
const emit = defineEmits(["search", "reset"]);

const handleSearch = () => {
  emit("search", newValue);
};

const handleReset = () => {
  emit("reset", true);
};
</script>
