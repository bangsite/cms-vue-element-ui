<template>
  <a-card title="Product Variant" class="product__container">
    <!-- Begin Product Variant -->
    <VariantForm :data="variantList" />
    <!-- End Product Variant -->
  </a-card>

  <a-card title="Product Area" class="product__container">
    <!-- Begin Variant Interactive Area -->
    <VariantArea />
    <!-- End Variant Interactive Area -->
  </a-card>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

import VariantForm from "@/views/product/components/VariantForm.vue";
import VariantArea from "@/views/product/components/VariantArea.vue";
import { Variant } from "@/core/interfaces/variant";
import { useListVariant } from "@/shared/composables/useVariantQuery";

const route = useRoute();
const productId = ref(route.params.productId as string);
const variantList = ref<Variant[]>([]);
const paramsValue = reactive({ with: "areas.file" });
const { isLoading, data } = useListVariant(productId.value, { params: paramsValue });

onBeforeMount(() => {
  if (data.value) {
    data.value?.data.forEach((item: Variant) => {
      variantList.value.push({ ...item });
    });
  }
});

watch(data, () => {
  if (data.value) {
    data.value?.data.forEach((item: Variant) => {
      variantList.value.push({ ...item });
    });
  }
});
</script>
