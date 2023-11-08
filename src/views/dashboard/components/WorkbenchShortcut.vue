<template>
  <el-card hoverable shadow="hover">
    <div class="flex flex-col align-center">
      <SvgIcon :icon="icon" :size="32" :style="{ color: iconColor }" />
      <p class="m-5 line-clamp-3">{{ label }}</p>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import { Shortcuts } from "@/core/interfaces/workbench.interface";

defineProps<Shortcuts>();
</script>
