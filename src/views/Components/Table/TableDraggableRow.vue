<template>
  <ACard title="Holtel Popular">
    <ATable bordered :dataSource="data" :columns="columns" :loading="isLoading" @change="handleChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div class="table-action">
            <a-button type="primary" @click="handleEdit">Edit</a-button>
            <a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="handleDelete(record)">
              <a-button type="primary" danger ghost>Delete</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </ATable>
  </ACard>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue";
import type { TableProps } from "ant-design-vue";

import { columnsTableBasic } from "@/views/Components/Table/useColumns";
import useBooking from "@/composables/useBooking";

const columns = computed(() => columnsTableBasic);
const data = ref([]);

const { fetchListHotels, response, isLoading } = useBooking();

onBeforeMount(async () => {
  await fetchListHotels();

  if (response.value) {
    let get50Item = response.value.filter((item, idx) => idx < 50) || [];
    data.value = [...get50Item];
  }
});

const handleChange: TableProps["onChange"] = (pagination, filters, sorter) => {
  console.log("Various parameters", pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};

const handleEdit = () => {
  console.log("edit row");
  showModal.value = !showModal.value;
};

const handleDelete = (record: Record<string, any>) => {
  console.log("delete row:", record);
};
</script>

<style scoped></style>
