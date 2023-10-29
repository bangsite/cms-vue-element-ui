<script setup lang="ts">
import { ref } from "vue";
import { CaretRightOutlined } from "@ant-design/icons-vue";

const activeKeyTags = ref(["tags"]);
</script>

<template>
  <a-collapse
    v-model:activeKey="activeKeyTags"
    collapsible="header"
    :expand-icon-position="'end'"
    style="background: #fff"
    class="tags"
  >
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="tags" header="Tags" class="tags__title">
      <p>This is list tag</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.tags__title {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
