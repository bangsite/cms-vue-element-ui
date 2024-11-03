<template>
  <div class="flex align-center justify-between gap-1">
    <div>
      <!--      <FileInput name="Upload">-->
      <!--        <template #description>-->
      <!--          <el-button type="primary">Upload</el-button>-->
      <!--        </template>-->
      <!--      </FileInput>-->
      <el-button type="primary" :icon="Refresh">Refresh</el-button>
    </div>

    <SelectBase name="Sort by" placeholder="Sort by"></SelectBase>
  </div>
  <el-divider border-style="dashed" style="margin: 0 0 15px" />

  <div class="flex h-auto w-full">
    <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 w-full">
      <el-image
        v-for="images in response"
        :key="images.publicId"
        :src="images.thumbUrl"
        lazy
        :fit="'cover'"
        class="min-h-[320px] h-auto"
      >
        <template #error>
          <div class="image-slot flex items-center justify-center w-full h-full text-xl text-gray-500 bg-gray-200">
            <SvgIcon :icon="'circum:image-on'" :size="36" />
          </div>
        </template>
      </el-image>
    </div>
  </div>

  <ModalView
    v-if="isModalActive"
    :modalActive="isModalActive"
    :disable-footer="true"
    @close-modal="isModalActive = !isModalActive"
  >
    <template #header><h4>Upload Files</h4></template>
    <template #body>
      <component
        :is="FileInput"
        name="Upload"
        @uploadFiles="handleUploadFiles"
        @closeModal="isModalActive = !isModalActive"
      />
    </template>
  </ModalView>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { Refresh } from "@element-plus/icons-vue";

import ModalView from "@/components/modal/ModalView.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import SelectBase from "@/components/form/SelectBase.vue";

import useMedia from "@/hooks/api/useMedia";

const FileInput = defineAsyncComponent(() => import("@/components/upload/FileInput.vue"));

const { getListImage, response } = useMedia();
const isModalActive = ref(false);

onBeforeMount(async () => {
  await getListImage();
});

const handleUploadFiles = () => {};
</script>

<style scoped></style>
