<template>
  <AppPageHeader>
    <template #header>
      <!-- <a-page-header>
        <template #title>
          {{ $t('ORDER.LIST') }}
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
          {{ $t(`MENU.ORDERS`) }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </AppPageHeader>
  <!--  SEARCH  -->
  <OrderSearch @search="onSearch" />
  <!--  TABLE  -->
  <OrderTable />
</template>

<script setup lang="ts">
// import AppPageHeader from '@/components/AppPageHeader.vue';
import OrderSearch from "@/views/order/components/OrderSearch.vue";
import type { OrderSearchParams } from "@/core/types/actions/order.actions";
import OrderTable from "@/views/order/components/OrderTable.vue";
import { useGetListOrders } from "@/shared/composables/useOrderQuery";
import { ref } from "vue";
import type { PaginationParams } from "@/core/services/modules/order.service";

const params = ref<PaginationParams>({
  page: 1,
  per_page: 10,
});
const total = ref(0);
const { data, isFetching } = useGetListOrders(params, {
  onSuccess: (data) => {
    params.value.page = data.pagination.currentPage;
    params.value.per_page = data.pagination.perPage;
    total.value = data.pagination.total;
  },
  onError: () => {
    console.log("error");
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
const onSearch = (values: OrderSearchParams) => {
  console.log(values.name);
};
</script>

<style scoped></style>
