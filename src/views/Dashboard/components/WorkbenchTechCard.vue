<template>
  <ElCard shadow="hover">
    <div class="flex flex-col" @click="handleOpenSite">
      <div class="flex flex-start">
        <SvgIcon :icon="icon" :size="30" :style="{ color: iconColor }" class="mr-15" />
        <h3 class="m-0">{{ name }}</h3>
      </div>
      <p class="m-5 line-clamp-2">{{ description }}</p>
      <div class="flex flex-end">
        <span>{{ author }}</span>
      </div>
    </div>
  </ElCard>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { Technology } from "@/core/interfaces/workbench.interface";

const props = defineProps<Technology>();

const handleOpenSite = () => {
  window.open(props.site, "_blank");
};
</script>
