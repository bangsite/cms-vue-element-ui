<script setup lang="ts">
const emit = defineEmits(["onPublish", "onPreview", "onDraft"]);

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
  <div class="flex p-4 bg-white w-full mb-4 rounded-md">
    <el-collapse accordion class="w-full">
      <el-collapse-item name="1">
        <template #title><h4>Publish</h4></template>
        <div>
          <div class="publish__top">
            <span>Status: Draft</span>
          </div>
          <div class="publish__bottom">
            <el-button class="btn-submit" @click="handlePreview">Preview</el-button>
            <el-button type="primary" class="btn-submit" @click="handlePublish">Publish</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
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
