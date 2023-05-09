<template>
  <a-drawer v-model:visible="visible">
    <InputBase name="name" label="Name" />
  </a-drawer>
</template>

<script lang="ts" setup>
import InputBase from "@/components/InputBase.vue";
import { ref } from "vue";
const visible = ref(false);

defineExpose({
  visible,
});
</script>

<style scoped></style>
