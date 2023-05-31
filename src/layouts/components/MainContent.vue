<template>
  <section class="main">
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </template>
      <template v-else>
        <keep-alive>
          <component :is="route.name" :key="route.fullPath" />
        </keep-alive>
      </template>
    </RouterView>
  </section>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";
// import { useTagsViewStore } from "@/core/stores/modules/tags.store";

const appStore = useAppStore();

// const tagsViewStore = useTagsViewStore();

// const getCaches = computed((): string[] => {
//   return tagsViewStore.getCachedViews;
// });
// console.log(getCaches.value);
</script>
