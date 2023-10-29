<template>
  <ACard title="Holtel Popular">
    <div class="table-operations">
      <a-button @click="setAgeSort">Sort Name</a-button>
      <a-button @click="clearFilters">Clear Filters</a-button>
      <a-button @click="clearAll">Clear All</a-button>
    </div>

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

  <CustomModal @closeModal="toggleModal" :showModal="showModal">
    <template #header>
      <div>Edit Record</div>
    </template>
    <template #body>
      <h1>This is a Modal Body</h1>
      <p>This is a modal message</p>
    </template>
    <template #footer>
      <div class="btn-action">
        <a-button>Cancel</a-button>
        <a-button type="primary">Submit</a-button>
      </div>
    </template>
  </CustomModal>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import type { TableProps } from "ant-design-vue";
import useFilter from "@/views/Components/Table/useFilter";
import useSorter from "@/views/Components/Table/useSorter";
import { columnsTableBasic } from "@/views/Components/Table/useColumns";
import CustomModal from "@/components/modal/Custom.vue";
import useBooking from "@/composables/useBooking";

const { fetchListHotels, response, isLoading } = useBooking();
const { filteredInfo, clearFilters } = useFilter();
const { sortedInfo, setAgeSort } = useSorter();

const columns = computed(() => columnsTableBasic);
const data = ref([]);
const showModal = ref(false);

onBeforeMount(async () => {
  await fetchListHotels();

  if (response.value) {
    let get50Item = response.value.filter((item, idx) => idx < 50) || [];
    data.value = [...get50Item];
  }
});

const toggleModal = () => {
  console.log(showModal);
  showModal.value = !showModal.value;
};

const clearAll = () => {
  filteredInfo.value = null;
  sortedInfo.value = null;
};

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
<style>
.table-operations {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.table-action {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
