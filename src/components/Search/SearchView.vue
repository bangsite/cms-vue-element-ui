<template>
  <ElTooltip placement="bottom" trigger="hover" effect="dark">
    <template #content>
      <span>Search</span>
    </template>
    <div class="search w-40 h-full flex flex-center">
      <SvgIcon :icon="'uil:search'" :size="20" />
    </div>
  </ElTooltip>
  <SearchModal v-model:value="show" />
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import SearchModal from "@/components/Search/components/SearchModal.vue";
</script>
