<template>
  <el-card class="rounded-md mb-4">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Upload images</h4>
      </div>
    </template>
    <UploadImages name="files" />
    <el-divider border-style="dashed" />

    <el-button type="primary" class="flex justify-self-end">Upload</el-button>
  </el-card>

  <h4>Data JSON</h4>
  <div class="border border-solid border-gray-300 flex h-32 max-h-96 rounded-md overflow-y-auto p-4">
    <vue-json-pretty :data="data" />
    <!--      <pre>-->
    <!--        {{ JSON.stringify(data, null, 1) }}-->
    <!--      </pre>-->
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

import ModalView from "@/components/modal/ModalView.vue";

import useMedia from "@/hooks/api/useMedia";
import UploadImages from "@/components/upload/UploadImages.vue";
import VueJsonPretty from "vue-json-pretty";

const FileInput = defineAsyncComponent(() => import("@/components/upload/FileInput.vue"));

const { getListImage, response } = useMedia();
const isModalActive = ref(false);

onBeforeMount(async () => {
  await getListImage();
});

const handleUploadFiles = () => {};
</script>

<style scoped></style>
