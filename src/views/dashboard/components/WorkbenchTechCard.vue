<template>
  <el-card shadow="hover">
    <div class="flex flex-col justify-center cursor-pointer" @click="handleOpenSite">
      <div class="flex justify-start">
        <SvgIcon :icon="icon" :size="24" :style="{ color: iconColor }" class="mr-5" />
        <h3 class="m-0">{{ name }}</h3>
      </div>
      <p class="m-5 line-clamp-2">{{ description }}</p>
      <div class="flex justify-end">
        <span>{{ author }}</span>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import { Technology } from "@/core/interfaces/workbench.interface";

const props = defineProps<Technology>();

const handleOpenSite = () => {
  window.open(props.site, "_blank");
};
</script>
