<template>
  <el-card title="Holtel Popular">
    <div class="table-operations">
      <el-button @click="setAgeSort">Sort Name</el-button>
      <el-button @click="clearFilter">Clear Filters</el-button>
      <el-button @click="clearAll">Clear All</el-button>
    </div>

    <el-table
      ref="table"
      size="small"
      border
      highlight-current-row
      v-loading="isLoading"
      :data="data"
      :default-sort="tableSort ? { prop: tableSortBy, order: tableSortOrder } : { prop: '', order: '' }"
    >
      <el-table-column type="index" label="#" width="50" align="center" />
      <template v-for="column in columns" :key="column.key">
        <el-table-column v-if="column.key === 'action'" :prop="column.key" :label="column.title">
          <template #default="scope">
            <div class="table-action">
              <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="column.key === 'number_of_rooms'"
          :prop="column.dataIndex"
          :label="column.title"
          sortable
          width="90"
        />
        <el-table-column v-else-if="column.key === 'zip'" :prop="column.dataIndex" :label="column.title" width="90" />
        <el-table-column
          v-else-if="column.key === 'currency'"
          :prop="column.dataIndex"
          :label="column.title"
          width="120"
        />
        <el-table-column v-else :prop="column.dataIndex" :label="column.title" width="auto" />
      </template>
    </el-table>
    <el-divider />
    <Pagiantion :page="1" :total="data.length" :page-size="pagination.pageSize" />
  </el-card>

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
        <el-button>Cancel</el-button>
        <el-button type="primary">Submit</el-button>
      </div>
    </template>
  </CustomModal>
  <!--    https://laracasts.com/discuss/channels/vue/element-ui-table-combine-pagination-and-search-->
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import useFilter from "@/views/Components/Table/useFilter";
import useSorter from "@/views/Components/Table/useSorter";
import { columnsTableBasic } from "@/views/Components/Table/useColumns";
import CustomModal from "@/components/modal/Custom.vue";
import useBooking from "@/composables/useBooking";
import type { TableInstance } from "element-plus";
import { ElMessageBox } from "element-plus";
import Pagiantion from "@/components/common/Pagiantion.vue";

const { fetchListHotels, response, isLoading } = useBooking();
const { filteredInfo, clearFilters } = useFilter();
const { sortedInfo, setAgeSort } = useSorter();

const columns = computed(() => columnsTableBasic);
const tableRef = ref<TableInstance>();
const data = ref([]);
const showModal = ref(false);
const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0,
});
onBeforeMount(async () => {
  await fetchListHotels();

  if (response.value) {
    let get50Item = response.value.filter((item, idx) => idx < 20) || [];
    data.value = [...get50Item];
    pagination.value.total = data.value.length;
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
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter();
};

const handleChange = (pagination, filters, sorter) => {
  console.log("Various parameters", pagination, filters, sorter);
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
};

const handleEdit = (index: number, row) => {
  console.log(index, row);
  showModal.value = !showModal.value;
};

const handleDelete = (index: number, row) => {
  console.log(index, row);
  ElMessageBox.confirm("Are you sure to delete this?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  });
};

const confirmEvent = () => {
  console.log("confirm!");
};
const cancelEvent = () => {
  console.log("cancel!");
};

const handleCurrentChange = (val: number) => {
  console.log(val);
  pagination.value.page = val;
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
