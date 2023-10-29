<script setup lang="ts">
import { ref } from "vue";
import { CaretRightOutlined } from "@ant-design/icons-vue";

const activeKeyCategories = ref(["categories"]);
</script>

<template>
  <a-collapse
    v-model:activeKey="activeKeyCategories"
    collapsible="header"
    :expand-icon-position="'end'"
    style="background: #fff"
    class="category"
  >
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="categories" header="Category" class="category__title">
      <p>This is list category</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.category__title {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
