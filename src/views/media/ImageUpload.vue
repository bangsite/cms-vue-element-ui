<template>
  <UploadImagesCustom name="files" @dataUpload="handleDataUpload" />

  <h4>Data JSON</h4>
  <div class="border border-solid border-gray-300 flex h-full max-h-[42vh] rounded-md overflow-y-auto p-4">
    <vue-json-pretty :data="dataJson" :deep="4" :showLineNumber="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UploadImagesCustom from "@/components/upload/UploadImagesCustom.vue";

const dataJson = ref(null);
const handleDataUpload = (value: Record<string, any> | null) => {
  dataJson.value = value;
};
</script>

<style scoped></style>
