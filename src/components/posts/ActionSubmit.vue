<template>
  <el-card>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item name="1">
        <template #title><h4>Publish</h4></template>
        <div class="flex flex-col">
          <div class="flex items-center justify-between gap-2 mb-4">
            <el-button @click="handleDraft">Save Draft</el-button>
            <el-button type="primary" class="btn-submit" @click="handlePreview">Preview</el-button>
          </div>
          <div class="flex flex-col mb-2">
            <div class="flex items-center gap-1">
              <SvgIcon icon="grommet-icons:location-pin" siae="12" />
              <span>Status: Draft</span>
              <a href="#" class="underline">Edit</a>
            </div>
            <div class="flex items-center gap-1">
              <SvgIcon icon="flowbite:eye-outline" siae="12" />
              <span>Visibility: Publish</span>
              <a href="#" class="underline">Edit</a>
            </div>
          </div>

          <el-divider border-style="dashed" class="my-4" />
          <div class="publish__bottom">
            <el-button type="danger" plain class="btn-submit" @click="handleMoveTrash">Move Trash</el-button>
            <el-button type="primary" class="btn-submit" @click="handlePublish">Publish</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

const emit = defineEmits(["onPublish", "onPreview", "onDraft"]);
const activeName = ref("1");
const handleDraft = () => {
  emit("onDraft", true);
};
const handleMoveTrash = () => {};
const handlePreview = () => {
  emit("onPreview", true);
};
const handlePublish = () => {
  emit("onPublish", true);
};
</script>

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
