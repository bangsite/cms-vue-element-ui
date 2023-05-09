<template>
  <!-- Begin Product Search -->
  <ProductSearch @filter-changed="onFilterChange($event, loadList)" />
  <!-- End Product Search -->

  <!-- Begin Product Card -->
  <ProductCard :data="productList" />
  <!-- End Product Card -->
</template>

<script lang="ts" setup>
import { ref } from "vue";

import useFilterSearch from "@/shared/composables/useFilterSearch";
import usePagination from "@/shared/composables/usePagination";
import ProductCard from "@/views/product/ProductCard.vue";
import ProductSearch from "@/views/product/ProductSearch.vue";

const { keyFilters, onFilterChange } = useFilterSearch();
const { params, onPageChange } = usePagination();

const loadList = async () => {
  if (keyFilters.value.page === 1) params.value.page = 1;

  const filter = {};
};

const productList = ref<[]>([]);
</script>

<style scoped></style>
