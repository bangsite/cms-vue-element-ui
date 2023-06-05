<template>
  <ElCard shadow="hover">
    <div class="flex flex-col flex-center">
      <SvgIcon :icon="icon" :size="30" :style="{ color: iconColor }" />
      <p class="m-5 line-clamp-3">{{ label }}</p>
    </div>
  </ElCard>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { Shortcuts } from "@/core/interfaces/workbench.interface";

defineProps<Shortcuts>();
</script>
