<template>
  <el-tooltip placement="bottom" trigger="hover">
    <template #content>
      <span>Full screen</span>
    </template>
    <div class="full-screen w-40px flex flex-center" @click="toggle">
      <SvgIcon :icon="'gridicons:fullscreen-exit'" v-if="isFullscreen" />
      <SvgIcon :icon="'gridicons:fullscreen'" v-else />
    </div>
  </el-tooltip>
</template>
<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import SvgIcon from "@/components/common/SvgIcon.vue";

const { toggle, isFullscreen } = useFullscreen();
</script>
