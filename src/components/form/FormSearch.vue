<template>
  <el-card class="mb-4 rounded-md">
    <template #header v-if="searchTitle">
      <h4 class="title">{{ searchTitle }}</h4>
    </template>

    <el-form ref="formRef" :model="searchParam" :label-position="labelPosition">
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
            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"
            :options="searchSelectData"
          />
          <DatePicker
            v-else-if="item.search?.el === 'date'"
            :label="`${item.search?.label ?? item.label}`"
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

import InputBase from "@/components/form/InputBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";
import DatePicker from "@/components/form/DatePicker.vue";

import { toLowerCase } from "@/utils/fortmatString";

interface ProTableProps {
  labelPosition?: string;
  searchTitle?: string;
  searchColumns?: any[];
  searchParam?: { [key: string]: any };
  searchCol?: number;
  searchSelectData?: any[];
}

withDefaults(defineProps<ProTableProps>(), {
  labelPosition: "top",
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
