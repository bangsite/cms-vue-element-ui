<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr class="">
          <th v-for="field in fields" :key="field.key" scope="col" class="px-6 py-3">
            {{ field.label }}
          </th>
        </tr>
      </thead>
      <tbody class="dark:bg-slate-800">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="item in items" :key="item.id">
          <td scope="row" class="px-6 py-4" v-for="key in displayedFieldKeys" :key="key">
            <slot :name="`cell(${key})`" :value="item[key]" :item="item">
              {{ item[key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from "vue";

interface TableField {
  key: string;
  label: string;
}

interface TableItem {
  id: number;
  [key: string]: unknown;
}

const props = defineProps({
    fields: {
        type: Array as PropType<TableField[]>,
        default: () => [],
    },
    items: {
        type: Array as PropType<TableItem[]>,
        default: () => [],
    },
});

const displayedFieldKeys = computed(() => {
    return Object.entries(props.fields).map(([_key, value]) => value.key);
});
</script>
<!-- https://github.com/themesberg/flowbite-vue/blob/main/src/components/Table/Table.vue -->
