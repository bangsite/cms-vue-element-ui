<template>
    <div :id="`${variables.namespace}-tool-header`"
         :class="[prefixCls,
                    'h-[var(--top-tool-height)] relative px-[var(--top-tool-p-x)] flex items-center justify-between',
                    'dark:bg-[var(--el-bg-color)]']">
        <template v-if="layout !== 'top'">
            <div class="h-full flex items-center">
                <template v-if="hamburger && layout !== 'cutMenu'">
                    <Collapse class="hover-trigger" color="var(--top-header-text-color)" />
                </template>

                <template v-if="breadcrumb">
                    <Breadcrumb class="<md:hidden" />
                </template>
            </div>
        </template>

        <div class="h-full flex items-center">
            <template v-if="screenFull">
                <ScreenFull class="hover-trigger" color="var(--top-header-text-color)" />
            </template>
            <template v-if="size">
                <SizeDropDown class="hover-trigger" color="var(--top-header-text-color)" />
            </template>
            <template v-if="locale">
                <LocaleDropDown class="hover-trigger" color="var(--top-header-text-color)" />
            </template>

            <UserInfo class="hover-trigger"></UserInfo>
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";
import { useDesign } from "@/hooks/web/useDesign";

import Breadcrumb from "@/components/TheBreadcrumb.vue";
import Collapse from "@/components/Collapse/CollapseView.vue";
import LocaleDropDown from "@/components/LocaleDropDown.vue";
import SizeDropDown from "@/components/SizeDropDown.vue";
import UserInfo from "@/components/UserInfo.vue";
import ScreenFull from "@/components/ScreenFull.vue";

const appStore = useAppStore();
const { getPrefixCls, variables } = useDesign();
const prefixCls = getPrefixCls("tool-header");

const breadcrumb = computed(() => appStore.getBreadcrumb);

const hamburger = computed(() => appStore.getHamburger);

const screenFull = computed(() => appStore.getScreenFull);

const size = computed(() => appStore.getSize);

const layout = computed(() => appStore.getLayout);

const locale = computed(() => appStore.getLocale);

</script>

<style lang="less" scoped>
$prefix-cls: ~'${namespace}-tool-header';

.#{$prefix-cls} {
    transition: left var(--transition-time-02);
}
</style>
