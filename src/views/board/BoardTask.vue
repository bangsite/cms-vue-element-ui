<template>
  <div class="flex items-center gap-1 bg-white px-1 py-2 mb-2 overflow-x-auto rounded-lg">
    <div class="flex items-center drag-handle">
      <SvgIcon :icon="'ri:draggable'" :size="20" />
    </div>

    <p class="m-0 text-sm">{{ data.title }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Tasks } from "@/types";
import SvgIcon from "@/components/common/SvgIcon.vue";

defineProps({
  data: {
    type: Object as () => Tasks,
    default: () => {},
  },
});
</script>

<style lang="scss">
.sortable-drag {
  background-color: #e3e3e3;
  transform: rotate(5deg);
}

.sortable-ghost {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #c7c7c9;
    border-radius: 6px;
  }
}
</style>
