<template>
    <section>
        <RouterView #default="{Component, route}">
            <keep-alive :include="getCaches">
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </RouterView>
    </section>
    <TheFooter v-if="footer" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/core/stores/modules/app.store'
import { useTagsViewStore } from '@/core/stores/modules/tags.store'

import TheFooter  from '@/layouts/components/TheFooter.vue'

const appStore = useAppStore()

const footer = computed(() => appStore.getFooter)

const tagsViewStore = useTagsViewStore()

const getCaches = computed((): string[] => {
    return tagsViewStore.getCachedViews
})
</script>
