<template>
  <UploadImagesCustom name="files" @dataUpload="handleDataUpload" />

  <DataJsonPretty :data="dataJson" :showLine="true" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import UploadImagesCustom from "@/components/upload/UploadImagesCustom.vue";
import DataJsonPretty from "@/components/common/DataJsonPretty.vue";

const dataJson = ref();
const handleDataUpload = (value: Record<string, any> | null) => {
  dataJson.value = value;
};
</script>

<style scoped></style>
