<template>
  <a-card title="Search" class="form__card">
    <template #extra>
      <a-button type="primary"> Add</a-button>
    </template>

    <form class="form form__search" @submit.prevent="onSubmit">
      <div class="form__search-wrap">
        <div class="form__group">
          <InputBase name="title" :label="$t('POST.SEARCH.TITLE')" placeholder="Please input text!" />
        </div>
        <div class="form__group">
          <RangePickerBase
            name="create_at"
            type="select"
            :label="$t('POST.SEARCH.CREATE_AT')"
            :placeholder="[$t('COMMON.PLH_DATE'), $t('COMMON.PLH_DATE')]"
          />
        </div>
        <div class="form__group">
          <!--          <SelectBase name="tags" type="select" :label="$t('POST.SEARCH.TAGS')" :options="POST_TAGS" />-->
        </div>
      </div>

      <div class="form__action">
        <a-button class="btn-submit mb-10">Cancel</a-button>
        <a-button type="primary" class="btn-submit mb-10" htmlType="submit">Submit</a-button>
      </div>
    </form>
  </a-card>
  <a-table
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 1200 }"
    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'product_thumb'">
        <img :src="record?.product_thumb" alt="product" :width="80" :height="90" />
      </template>
      <template v-if="column.key === 'action'">
        <span>
          <a-button type="primary" class="btn mr-10">Edit</a-button>
          <a-button type="dashed" danger class="btn">Delete </a-button>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

import InputBase from "@/components/form/InputBase.vue";
import RangePickerBase from "@/components/form/RangePickerBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";
import { columns, data } from "@/views/Product/composables/useColumns";

type Key = string | number;

const state = reactive<{ selectedRowKeys: Key[]; loading: boolean }>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const onSelectChange = (selectedRowKeys: Key[]) => {
  state.selectedRowKeys = selectedRowKeys;
};

const onSubmit = () => {
  console.log("submit");
};
</script>

<style scoped></style>
