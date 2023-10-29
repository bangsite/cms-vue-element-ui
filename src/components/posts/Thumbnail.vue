<script setup lang="ts">
import { ref } from "vue";
import { CaretRightOutlined } from "@ant-design/icons-vue";
const activeKey = ref(["1"]);
</script>

<template>
  <a-collapse
    v-model:activeKey="activeKey"
    collapsible="header"
    :expand-icon-position="'end'"
    style="background: #fff"
    class="thumb"
  >
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="Featured image" class="thumb__title">
      <a href="#">Set featured image</a>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.thumb__title {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
