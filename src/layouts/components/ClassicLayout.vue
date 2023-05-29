<template>
    <div :class="['absolute top-0 left-0 h-full', { '!fixed z-3000': mobile }]">
        <template v-if="logo">
            <Logo :class="['bg-[var(--left-menu-bg-color)] border-bottom-1 border-solid border-[var(--logo-border-color)] dark:border-[var(--el-border-color)]',{
                    '!pl-0': mobile && collapse,
                    'w-[var(--left-menu-min-width)]': appStore.getCollapse,
                    'w-[var(--left-menu-max-width)]': !appStore.getCollapse }]"
                  style="transition: all var(--transition-time-02);" />
        </template>

        <Menu :class="[{ '!h-[calc(100%-var(--logo-height))]': logo }]" />
    </div>

    <div :class="[ `${prefixCls}-content`,'absolute top-0 h-[100%]',
        {
        'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
        collapse && !mobile,
        'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
        !collapse && !mobile,
        'fixed !w-full !left-0': mobile}]"
         style="transition: all var(--transition-time-02);">
        <ElScrollbar
            v-loading={pageLoading}
            :class="[
                `${prefixCls}-content-scrollbar`,
                {'!h-[calc(100%-var(--top-tool-height)-var(--tags-view-height))] mt-[calc(var(--top-tool-height)+var(--tags-view-height))]': fixedHeader}]">
            <div :class="[{
                'fixed top-0 left-0 z-10': fixedHeader,
                'w-[calc(100%-var(--left-menu-min-width))] left-[var(--left-menu-min-width)]':
                collapse && fixedHeader && !mobile,
                'w-[calc(100%-var(--left-menu-max-width))] left-[var(--left-menu-max-width)]':
                !collapse && fixedHeader && !mobile,
                '!w-full !left-0': mobile }]"
                 style="transition: all var(--transition-time-02);">
                <ToolHeader
                    class="border-bottom-1 border-solid border-[var(--top-tool-border-color)] bg-[var(--top-header-bg-color)] dark:border-[var(--el-border-color)]" />

                <template v-if="tagsView">
                    <TagsView
                        class="border-bottom-1 border-top-1 border-solid border-[var(--tags-view-border-color)] dark:border-[var(--el-border-color)]" />
                </template>
            </div>

            <AppView />
        </ElScrollbar>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useAppStore } from "@/core/stores/modules/app.store";

import AppView from "@/layouts/components/AppView.vue";

const appStore = useAppStore()

const collapse = computed(() => appStore.getCollapse)

const logo = computed(() => appStore.logo)

const mobile = computed(() => appStore.getMobile)

// const fixedMenu = computed(() => appStore.getFixedMenu)

const fixedHeader = computed(() => appStore.getFixedHeader)

const tagsView = computed(() => appStore.getTagsView)
</script>
