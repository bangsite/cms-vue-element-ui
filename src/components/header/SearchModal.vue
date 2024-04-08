<template>
  <ATooltip placement="bottom" trigger="hover">
    <template #title>
      <span>Search</span>
    </template>
    <div class="search w-40px h-full flex flex-center">
      <SvgIcon :icon="'uil:search'" :size="20" />
    </div>
  </ATooltip>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
</script>
