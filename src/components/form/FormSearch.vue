<template>
  <el-card class="mb-4 rounded-md">
    <template #header v-if="searchTitle">
      <h4 class="title">{{ searchTitle }}</h4>
    </template>

    <el-form ref="formRef" :model="searchParam" :label-position="labelPosition">
      <div class="grid grid-cols-2 gap-4 align-middle mb-2">
        <template v-for="item in searchColumns" :key="item.prop">
          <component
            :is="getComponentType(item.search.el)"
            v-bind="getComponentProps(item)"
            v-model="searchParam[item.prop]"
            @onChange="onChangeData"
          />

          <!--          <InputBase-->
          <!--            v-if="item.search?.el === 'input'"-->
          <!--            :label="`${item.search?.label ?? item.label}`"-->
          <!--            placeholder="Input text"-->
          <!--            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"-->
          <!--          />-->
          <!--          <SelectBase-->
          <!--            v-else-if="item.search?.el === 'select'"-->
          <!--            :label="`${item.search?.label ?? item.label}`"-->
          <!--            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"-->
          <!--            :options="searchSelectData"-->
          <!--          />-->
          <!--          <DatePicker-->
          <!--            v-else-if="item.search?.el === 'date'"-->
          <!--            :label="`${item.search?.label ?? item.label}`"-->
          <!--            :name="`${toLowerCase(item.search?.label ?? item.label) + '-' + index}`"-->
          <!--            :options="searchSelectData"-->
          <!--          />-->
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
import { markRaw, reactive } from "vue";
import type { SearchColumn, SearchProps } from "@/types";

const props = withDefaults(defineProps<SearchProps>(), {
  labelPosition: "top",
  searchColumns: () => [],
  searchParam: () => ({}),
});

const emit = defineEmits(["search", "reset"]);
const searchComponent: Record<string, any> = {
  input: markRaw(InputBase),
  select: markRaw(SelectBase),
  date: markRaw(DatePicker),
};
const searchParam = reactive({ ...props.searchParam });

const getComponentType = (type: string) => searchComponent[type] || InputBase;
const getComponentProps = (item: SearchColumn) => ({
  label: item.label,
  placeholder:
    item.search.el === "select"
      ? item.placeholder || `Select ${item.label}`
      : item.placeholder || `Enter ${item.label}`,
  name: `${toLowerCase(item.search?.label || item.label)}`,
  options: item.search.el === "select" ? props.searchSelectData?.[item.prop] : [],
});

const onChangeData = (data: Record<string, any>) => {
  const { key, value } = data;

  searchParam[key] = value;
};

const handleSearch = () => {
  emit("search", searchParam);
};

const handleReset = () => {
  Object.keys(searchParam).forEach((key) => {
    searchParam[key] = ""; // Reset each field in searchParam
  });
  emit("reset", true);
};
</script>
