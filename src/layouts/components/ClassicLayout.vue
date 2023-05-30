<template>
    <div class="layout__classic-sidebar">
        <TheLogo v-if="logo" />
        <TheNavigation />
    </div>

    <ElScrollbar v-loading={pageLoading} class="layout__main">
        <TheHeader/>
        <MainContent />
    </ElScrollbar>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useAppStore } from "@/core/stores/modules/app.store";

import TheLogo from "@/components/TheLogo.vue";
import TheHeader from "@/layouts/components/TheHeader.vue";
import TheNavigation from "@/layouts/components/TheNavigation.vue";
import MainContent from "@/layouts/components/MainContent.vue";

const appStore = useAppStore();

const logo = computed(() => appStore.logo);
const pageLoading = computed(() => appStore.getPageLoading);
</script>
