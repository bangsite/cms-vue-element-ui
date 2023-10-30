<template>
  <el-card title="Search" class="form__card">
    <template #extra>
      <el-button type="primary"> Add</el-button>
    </template>

    <el-form class="form form__search">
      <div class="form__search-wrap">
        <el-form-item class="form__group">
          <InputBase name="title" :label="$t('POST.SEARCH.TITLE')" placeholder="Please input text!" />
        </el-form-item>

        <el-form-item class="form__group">
          <RangePickerBase
            name="create_at"
            type="select"
            :label="$t('POST.SEARCH.CREATE_AT')"
            :placeholder="[$t('COMMON.PLH_DATE'), $t('COMMON.PLH_DATE')]"
          />
        </el-form-item>

        <el-form-item class="form__group">
          <SelectBase name="tags" type="select" :label="$t('POST.SEARCH.TAGS')" :options="POST_TAGS" />
        </el-form-item>
      </div>

      <el-form-item class="form__action">
        <el-button class="btn-submit mb-10">Cancel</el-button>
        <el-button type="primary" class="btn-submit mb-10" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card title="Posts">
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
  </el-card>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

import InputBase from "@/components/form/InputBase.vue";
import RangePickerBase from "@/components/form/RangePickerBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";
import { columns, data } from "@/views/Post/composables/useColumns";
import { POST_TAGS } from "@/views/Post/composables/useDataForm";
import { dateTime } from "@/utils/formatDateTime";

type Key = string | number;

const state = reactive<{ selectedRowKeys: Key[]; loading: boolean }>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

const onSubmit = () => {
  console.log("submit");
};
</script>

<style scoped></style>
