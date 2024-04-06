<template>
  <el-card>
    <template #header>
      <span>Table Draggable Row</span>
    </template>
    <el-table bordered :data="data" v-loading="isLoading" @change="handleChange" row-key="id">
      <template v-for="column in columns" :key="`col_${column.key}`">
        <el-table-column v-if="column.key === 'action'" :prop="column.key" :label="column.title" width="180">
          <template #default="scope">
            <div class="table-action">
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column v-else-if="column.key === 'sort'" :label="column.title" width="50" align="center">
          <el-link :underline="false" class="drag__row">
            <SvgIcon :icon="'carbon:drag-vertical'" />
          </el-link>
        </el-table-column>
        <el-table-column v-else-if="column.key === 'id'" type="index" :label="column.title" width="50" align="center" />

        <el-table-column
          v-else-if="column.key === 'hotel_description'"
          :prop="column.dataIndex"
          :label="column.title"
          show-overflow-tooltip
        />
        <el-table-column
          v-else-if="column.key === 'number_of_rooms'"
          :prop="column.dataIndex"
          :label="column.title"
          sortable
          width="100"
        />
        <!--        <el-table-column v-else-if="column.key === 'zip'" :prop="column.dataIndex" :label="column.title" width="90" />-->
        <el-table-column
          v-else-if="column.key === 'currency'"
          :prop="column.dataIndex"
          :label="column.title"
          width="120"
        />

        <el-table-column v-else :prop="column.dataIndex" :label="column.title" width="auto" />
      </template>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import Sortable from "sortablejs";

import { columnsTableBasic } from "@/views/Components/Table/useColumns";
import useBooking from "@/composables/useBooking";
import SvgIcon from "@/components/Common/SvgIcon.vue";

const columns = computed(() => columnsTableBasic);
const data = ref([]);

const { fetchListHotels, response, isLoading } = useBooking();

onBeforeMount(async () => {
  await fetchListHotels();

  if (response.value) {
    let get50Item = response.value.filter((item, idx) => idx < 15) || [];
    data.value = [...get50Item];
  }
});

onMounted(() => {
  rowDrop();
});

const handleChange = (pagination: string, filters: string, sorter: string) => {
  console.log("Various parameters", pagination, filters, sorter);
  // filteredInfo.value = filters;
  // sortedInfo.value = sorter;
};

const handleEdit = () => {
  console.log("edit row");
  // showModal.value = !showModal.value;
};

const handleDelete = (record: Record<string, any>) => {
  console.log("delete row:", record);
};

const rowDrop = () => {
  const tbody = document.querySelector(".el-table__body-wrapper tbody") as HTMLElement;
  Sortable.create(tbody, {
    // draggable: ".draggable .el-table__row",
    handle: ".drag__row",
    animation: 300,
    onEnd({ newIndex, olIndex }) {
      const currentRow = data.value.splice(olIndex, 1)[0];
      data.value.splice(newIndex, 0, currentRow);
    },
  });
};
</script>

<style scoped></style>
