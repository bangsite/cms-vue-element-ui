<template>
  <div class="px-24px h-44px flex-center">
    <span class="mr-15 flex-center">
      <SvgIcon :icon="'mdi:keyboard-return'" :size="24" />
      <span>Confirm</span>
    </span>
    <span class="mr-15 flex-center">
      <SvgIcon :icon="'mdi:arrow-up-thin'" :size="24" />
      <SvgIcon :icon="'mdi:arrow-down-thin'" :size="24" />

      <span>Switch</span>
    </span>
    <span class="flex-center">
      <SvgIcon :icon="'mdi:keyboard-esc'" :size="24" />
      <span>Closure</span>
    </span>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
</script>
