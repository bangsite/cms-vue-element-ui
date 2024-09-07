<template>
  <el-card shadow="hover" class="rounded-md">
    <template #header><h4 class="title">Ecosystem</h4></template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <el-card shadow="hover" v-for="item in data" :key="item.id" class="rounded-md">
        <div class="flex flex-col justify-center cursor-pointer" @click="handleOpenSite(item.site)">
          <div class="flex justify-start mb-2">
            <SvgIcon :icon="item.icon" :size="24" :style="{ color: item?.color }" class="mr-2" />
            <h5>{{ item.name }}</h5>
          </div>

          <p class="line-clamp-3">{{ item.description }}</p>
          <div class="flex justify-end text-gray-500 italic text-[14px]">
            {{ item.author }}
          </div>
        </div>
      </el-card>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { DATA_WORK_TECH } from "@/db";

const data = computed(() => DATA_WORK_TECH);

const handleOpenSite = (url: string) => {
  window.open(url, "_blank");
};
</script>
