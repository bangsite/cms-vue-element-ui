<template>
  <ElCard>
    <div class="flex flex-center">
      <SvgIcon :icon="item.icon" :style="{ color: item.iconColor }" class="text-30px" />
      <h3 class="">{{ item.name }}</h3>
    </div>
    <p class="">{{ item.description }}</p>
    <div class="flex flex-center">
      {{ item.author }}
    </div>
  </ElCard>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { Technology } from "@/interfaces/workbench.interface";

const props = defineProps<Technology>();
</script>
