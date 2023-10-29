<script setup lang="ts">
import { ref } from "vue";
import { CaretRightOutlined } from "@ant-design/icons-vue";

const emit = defineEmits(["onPublish", "onPreview", "onDraft"]);

const activeKeyCategories = ref(["publish"]);

const handleDraft = () => {
  emit("onDraft", true);
};
const handlePreview = () => {
  emit("onPreview", true);
};
const handlePublish = () => {
  emit("onPublish", true);
};
</script>

<template>
  <a-collapse
    v-model:activeKey="activeKeyCategories"
    collapsible="header"
    :expand-icon-position="'end'"
    style="background: #fff"
    class="publish"
  >
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="publish" header="Publish" class="publish">
      <div class="publish__top">
        <p>Status: Draft</p>
        <div class="publish__top-visible">
          <span>Visibility: Draft</span>
          <a href="#">Edit</a>
        </div>
      </div>
      <div class="publish__bottom">
        <a-button class="btn-submit" @click="handleDraft">Save Draft</a-button>

        <a-button type="primary" class="btn-submit" @click="handlePublish">Publish</a-button>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.publish {
  font-size: 1.2rem;
  font-weight: 600;

  &__top {
    margin-bottom: 1rem;

    &-visible {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      a {
        text-decoration: underline;
      }
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
