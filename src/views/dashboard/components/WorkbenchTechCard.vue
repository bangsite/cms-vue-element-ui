<template>
  <el-card shadow="hover" class="rounded-xl">
    <template #header><h4 class="title">Ecosystem</h4></template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <el-card shadow="hover" v-for="item in WorkTechData" :key="item.id" class="rounded-xl">
        <div class="flex flex-col justify-center cursor-pointer" @click="handleOpenSite(item.site)">
          <div class="flex justify-start mb-5">
            <SvgIcon :icon="item.icon" :size="24" :style="{ color: item?.color }" class="mr-5" />
            <h4>{{ item.name }}</h4>
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
import { WorkTech } from "@/data/workbench.data";
import SvgIcon from "@/components/common/SvgIcon.vue";

const WorkTechData = computed(() => WorkTech);

const handleOpenSite = (url: string) => {
  window.open(url, "_blank");
};
</script>
