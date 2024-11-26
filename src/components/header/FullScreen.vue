<template>
  <div
    class="bg-transparent hover:bg-gray-100 hover:dark:bg-gray-800 cursor-pointer flex items-center justify-center w-9 h-9 rounded-full"
  >
    <el-tooltip placement="bottom" trigger="hover">
      <template #content>
        <span>Full screen</span>
      </template>
      <div @click="toggle">
        <SvgIcon :icon="'gridicons:fullscreen-exit'" :size="20" v-if="isFullscreen" />
        <SvgIcon :icon="'gridicons:fullscreen'" :size="20" v-else />
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";
import SvgIcon from "@/components/common/SvgIcon.vue";

const { toggle, isFullscreen } = useFullscreen();
</script>
