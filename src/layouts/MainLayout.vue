<template>
    <section :class="[prefixCls, `${prefixCls}__${layout}`, 'w-[100%] h-[100%] relative']">
        <template v-if="mobile && !collapse ">
            <div class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]" @click="handleClickOutside"
            ></div>
        </template>

        <component :is="useRenderLayout()"></component>

        <Backtop></Backtop>

        <Setting></Setting>
    </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useDesign } from "@/hooks/web/useDesign";
import { useAppStore } from "@/core/stores/modules/app.store";
import { useRenderLayout } from "@/hooks/web/useRenderLayout";

const appStore = useAppStore();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("layout");

const collapse = computed(() => appStore.getCollapse);
const mobile = computed(() => appStore.getMobile);
const layout = computed(() => appStore.getLayout);

const handleClickOutside = () => {
    appStore.setCollapse(true);
};


</script>
<style lang="scss" scoped>
$prefix-cls: '#{$namespace}-layout';

.#{$prefix-cls} {
    background-color: var(--app-content-bg-color);

    :deep(.#{$elNamespace}-scrollbar__view) {
        height: 100% !important;
    }
}
</style>
