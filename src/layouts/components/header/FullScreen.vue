<template>
  <ElTooltip placement="bottom" trigger="hover" effect="dark">
    <template #content>
      <span>Full screen</span>
    </template>
    <div class="full-screen w-40px h-full flex flex-center" @click="toggle">
      <SvgIcon :icon="'gridicons:fullscreen-exit'" :size="20" v-if="isFullscreen"></SvgIcon>
      <SvgIcon :icon="'gridicons:fullscreen'" :size="20" v-else></SvgIcon>
    </div>
  </ElTooltip>
</template>
<script setup>
import { useFullscreen } from "@vueuse/core";
import { propTypes } from "@/shared/utils/propTypes";
import SvgIcon from "@/components/SvgIcon.vue";

defineProps({
  color: propTypes.string.def(""),
});

const { toggle, isFullscreen } = useFullscreen();
</script>
