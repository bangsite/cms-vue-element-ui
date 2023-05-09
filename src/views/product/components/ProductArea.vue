<template>
  <form class="product__container">
    <div title="Product Variant" class="product__variant">
      <!-- Begin Product Variant -->
      <VariantList :data="variantList" />
      <!-- End Product Variant -->

      <!-- Begin Variant Interactive Area -->
      <VariantArea />
      <!-- End Variant Interactive Area -->
    </div>
    <div class="area__action">
      <a-button class="btn-cancel mr-5" @click="$router.push('/products')">
        {{ $t("COMMON.CANCEL") }}
      </a-button>
      <a-button type="primary" class="btn-add">
        {{ $t("COMMON.SAVE") }}
      </a-button>
    </div>
  </form>
</template>
<script lang="ts" setup>
import VariantList from "./VariantForm.vue";
import VariantArea from "../components/VariantArea.vue";
</script>
