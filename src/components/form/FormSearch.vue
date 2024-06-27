<template>
  <el-card class="mb-4">
    <template #header>Search Movie</template>

    <el-form ref="formRef" :model="searchParam">
      <div class="grid grid-cols-2 gap-4 align-middle mb-2">
        <template v-for="(item, index) in searchColumns" :key="item.prop">
          <InputBase
            v-if="item.search?.el === 'input'"
            :label="`${item.search?.label ?? item.label}`"
            placeholder="Input text"
            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"
          />
          <SelectBase
            v-else-if="item.search?.el === 'select'"
            :label="`${item.search?.label ?? item.label}`"
            placeholder="Select item"
            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"
            :options="searchSelectData"
          />
        </template>
      </div>
      <div class="flex justify-end">
        <el-button :icon="Delete" @click="handleReset">Reset</el-button>
        <el-button type="primary" :icon="Search" @click="handleSearch">Search</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { Delete, Search } from "@element-plus/icons-vue";
import type { BreakPoint } from "@/interfaces/responsive.interface";
import InputBase from "@/components/form/InputBase.vue";
import { toLowerCase } from "@/utils/fortmatString";
import SelectBase from "@/components/form/SelectBase.vue";

interface ProTableProps {
  searchColumns?: any[];
  searchParam?: { [key: string]: any };
  searchCol?: number | Record<BreakPoint, number>;
  searchSelectData?: any[];
}

withDefaults(defineProps<ProTableProps>(), {
  searchColumns: () => [],
  searchParam: () => ({}),
});

const emit = defineEmits(["search", "reset"]);

const handleSearch = (newValue: any) => {
  emit("search", newValue);
};

const handleReset = () => {
  emit("reset", true);
};
</script>
