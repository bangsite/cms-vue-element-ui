<template>
  <ElTooltip placement="bottom" trigger="hover">
    <template #content><span>Search</span></template>

    <div class="search w-40px h-full flex flex-center">
      <SvgIcon :icon="'uil:search'" :size="20" />
    </div>
  </ElTooltip>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
</script>
