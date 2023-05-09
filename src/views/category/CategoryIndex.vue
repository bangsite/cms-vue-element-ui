<template>
  <AppPageHeader>
    <template #header>
      <!-- <a-page-header>
        <template #title>
          {{ $t('CATEGORY.LIST') }}
        </template>
        <template #extra>
          <a-button type="primary" @click="showModalCreate">
            <template #icon>
              <PlusOutlined />
            </template>
            {{ $t('COMMON.CREATE') }}
          </a-button>
        </template>
      </a-page-header> -->
    </template>
    <template #breadcrumb>
      <a-breadcrumb separator="-" style="font-size: 12px">
        <a-breadcrumb-item>
          <router-link :to="{ name: 'dashboard' }">
            {{ $t(`MENU.DASHBOARD`) }}
          </router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          {{ $t(`MENU.CATEGORY`) }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </AppPageHeader>
  <ModalCreate
    :visible="modalVisible"
    @cancel="modalVisible = false"
    :destroy-on-close="true"
    :addEditType="addEditType"
    :edit-id="editId"
    @closed="onCloseAddEdit"
  />

  <a-table
    :loading="isFetching"
    :data-source="data.data"
    :columns="columns"
    :pagination="pagination"
    @change="onChangePaginate"
    size="middle"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button type="primary" @click="editItem(record)" style="margin-left: 4px">
          <template #icon><EditOutlined /></template>
        </a-button>
        <a-button type="primary" @click="showDeleteConfirm(record.id)" style="margin-left: 4px">
          <template #icon><DeleteOutlined /></template>
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { useCategoryQuery } from "@/shared/composables/useCategoryQuery";
import { computed, reactive, ref, toRef, toRefs, unref, watch } from "vue";
import type { TablePaginationConfig } from "ant-design-vue";
import ModalCreate from "@/views/category/ModalCreateEdit.vue";
import { Modal, TableColumnProps } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useDeleteCategoryMutation } from "@/shared/composables/useCategoryMutation";
import { useQueryClient } from "vue-query";
// import AppPageHeader from '@/components/AppPageHeader.vue';
import type { PaginationParams } from "@/core/types/models/Common";

const queryClient = useQueryClient();
const { t } = useI18n();
const columns = computed<TableColumnProps[]>(() => [
  {
    title: t("COMMON.TITLE"),
    dataIndex: "title",
    key: "title",
    width: "50%",
  },
  {
    dataIndex: "action",
    key: "action",
    width: "50%",
  },
]);

const modalVisible = ref(false);
const addEditType = ref("add");
const params = ref<PaginationParams>({
  page: 1,
  per_page: 10,
});
const total = ref(0);
const editId = ref<string | undefined>(undefined);

const pagination = computed(() => {
  return {
    current: params.value.page,
    pageSize: params.value.per_page,
    total: unref(total),
  } as TablePaginationConfig;
});
const { isFetching, data } = useCategoryQuery(params, {
  onSuccess: (data) => {
    params.value.page = data.pagination.currentPage;
    params.value.per_page = data.pagination.perPage;
    total.value = data.pagination.total;
  },
  keepPreviousData: true,
  placeholderData: () => {
    return {
      data: [],
      pagination: {
        count: 0,
        currentPage: 1,
        perPage: 10,
        total: 0,
      },
    };
  },
});

const { mutateAsync: handleDelete } = useDeleteCategoryMutation();

const onChangePaginate = (pagination: any) => {
  params.value.page = pagination.current;
  params.value.per_page = pagination.pageSize;
};

const showModalCreate = () => {
  modalVisible.value = true;
};
const onCloseAddEdit = () => {
  modalVisible.value = false;
  editId.value = undefined;
  addEditType.value = "add";
};
const editItem = (record: any) => {
  addEditType.value = "edit";
  editId.value = record.id;
  modalVisible.value = true;
};

const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: t("COMMON.DELETE"),
    content: t("CATEGORY.DELETE_MESSAGE"),
    okText: t("COMMON.DELETE"),
    okType: "danger",
    cancelText: t("COMMON.CANCEL"),
    async onOk() {
      await handleDelete(id, {
        onSuccess: () => {
          queryClient.invalidateQueries("category");
        },
      });
    },
  });
};
</script>

<style scoped></style>
