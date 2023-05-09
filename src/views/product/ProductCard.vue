<template>
  <div class="product">
    <h3 class="product__header">Product list</h3>
    <div class="product__wrap">
      <a-card
        hoverable
        v-for="(product, index) in dataProduct"
        :key="index"
        @click="$router.push({ name: 'products-edit', params: { productId: product.id } })"
      >
        <template #cover>
          <img v-if="product?.file?.path" :src="product?.file?.path" :alt="product?.file?.name" />

          <div v-else><IconUploadImage /></div>
        </template>
        <h3 class="product__title">
          {{ product?.title }}
        </h3>

        <p class="product__desc">
          {{ product?.description }}
        </p>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useListProduct } from "@/shared/composables/useProductQuery";

import IconUploadImage from "@/components/icons/IconUploadImage.vue";

const { data } = useListProduct({ params: { with: "file,categories" } });
console.log(data);

const dataProduct = computed(() => data.value?.data);
</script>

<style lang="scss"></style>
