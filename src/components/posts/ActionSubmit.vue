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
  <el-card>
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title><h3>Publish</h3></template>
        <div>
          <div class="publish__top">
            <p>Status: Draft</p>
            <div class="publish__top-visible">
              <span>Visibility: Draft</span>
              <a href="#">Edit</a>
            </div>
          </div>
          <div class="publish__bottom">
            <el-button class="btn-submit" @click="handleDraft">Save Draft</el-button>
            <el-button type="primary" class="btn-submit" @click="handlePublish">Publish</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
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
