<template>
    <section class="layout layout__classic">
        <template v-if="mobile && !collapse ">
            <div class="overlay" @click="handleClickOutside" />
        </template>

        <template v-if="layout === 'classic'">
            <ClassicLayout />
        </template>

    </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";

import ClassicLayout from "@/layouts/components/ClassicLayout.vue";


const appStore = useAppStore();

const collapse = computed(() => appStore.getCollapse);
const mobile = computed(() => appStore.getMobile);
const layout = computed(() => appStore.getLayout);

const handleClickOutside = () => {
    appStore.setCollapse(true);
};

</script>
<style lang="scss" scoped>
</style>
