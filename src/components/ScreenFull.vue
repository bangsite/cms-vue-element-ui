<template>
    <div :class="prefixCls" @click="toggleFullscreen">
        <Icon
            :size="18"
            :icon="isFullscreen ? 'zmdi:fullscreen-exit' : 'zmdi:fullscreen'"
            :color="color"
        />
    </div>
</template>
<script setup lang="ts">
import { propTypes } from "@/utils/propTypes";
import { useDesign } from "@/hooks/web/useDesign";
import { useFullscreen } from "@vueuse/core";

import Icon  from "@/components/IconCommon.vue";

const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("screenfull");

defineProps({
    color: propTypes.string.def("")
});

const { toggle, isFullscreen } = useFullscreen();

const toggleFullscreen = () => {
    toggle();
};
</script>
