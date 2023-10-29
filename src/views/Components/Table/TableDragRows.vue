<template>
  <ACard title="Table Draggable Row">
    <ATable bordered :dataSource="data" :columns="columns" :loading="isLoading" @change="handleChange">
      <template #bodyCell="{ column, record }">
        <Draggable
          :list="record"
          item-key="name"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #item="{ element }">
            <div class="list-group-item" :class="{ 'not-draggable': !enabled }">
              {{ element.name }}
            </div>
          </template>
        </Draggable>
        <!--        <template v-if="column.key === 'action'">-->
        <!--         -->

        <!--          &lt;!&ndash;          <div class="table-action">&ndash;&gt;-->
        <!--          &lt;!&ndash;            <a-button type="primary" @click="handleEdit" class="mr-10">Edit</a-button>&ndash;&gt;-->

        <!--          &lt;!&ndash;            <a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="handleDelete(record)">&ndash;&gt;-->
        <!--          &lt;!&ndash;              <a-button type="primary" danger ghost>Delete</a-button>&ndash;&gt;-->
        <!--          &lt;!&ndash;            </a-popconfirm>&ndash;&gt;-->
        <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
        <!--        </template>-->
      </template>
    </ATable>
  </ACard>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
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
