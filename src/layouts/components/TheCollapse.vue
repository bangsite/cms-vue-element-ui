<template>
    <div class="collapse collapse-trigger">
        <IconMenuBarRight v-if="collapse" class="collapse__icon" @click="toggleCollapse" />
        <IconMenuBarLeft v-else class="collapse__icon" @click="toggleCollapse" />
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/core/stores/modules/app.store'
import { propTypes } from '@/shared/utils/propTypes'

import IconMenuBarRight from "@/components/icons/IconMenuBarRight.vue";
import IconMenuBarLeft from "@/components/icons/IconMenuBarLeft.vue";

const appStore = useAppStore()


defineProps({ color: propTypes.string.def('') })

const collapse = computed(() => appStore.getCollapse)

const toggleCollapse = () => {
    const isCollapsed = collapse.value
    appStore.setCollapse(!isCollapsed)
}
</script>
<style lang="scss" scoped>
.collapse{
    cursor: pointer;

    &__icon{
        height: 1em;
        width: 1em;
        line-height: 1em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        fill: currentColor;
        color:hsl(210, 0%, 0%);
    }
    &-trigger{
        display: flex;
        height: 100%;
        padding: 1px 10px 0;
        cursor: pointer;
        align-items: center;
        transition: background .2s;
    }
}
</style>
