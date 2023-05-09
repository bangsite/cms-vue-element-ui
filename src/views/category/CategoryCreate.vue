<template>
  <div>
    <a-page-header :title="$t('CATEGORY.CREATE')" />

    <CategoryForm />
  </div>
</template>

<script lang="ts" setup>
import CategoryForm from "@/views/category/CategoryForm.vue";
</script>

<style scoped></style>
