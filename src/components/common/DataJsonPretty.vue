<template>
  <h4 class="title">Data JSON</h4>
  <div class="border border-solid border-gray-300 flex min-h-48 rounded-md overflow-y-auto p-4" :class="className">
    <vue-json-pretty :data="data" :showLine="showLine" :showLineNumber="showLineNumber" />
    <!--      <pre>-->
    <!--        {{ JSON.stringify(data, null, 1) }}-->
    <!--      </pre>-->
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: [Array, Object],
  },
  showLine: {
    type: Boolean,
    default: false,
  },
  showLineNumber: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
