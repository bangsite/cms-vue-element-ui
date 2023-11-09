<template>
  <el-card shadow="hover" class="mb-15">
    <template #header>Ecosystem</template>
    <div class="work__main-tech">
      <el-card shadow="hover" v-for="item in WorkTechData" :key="item.id">
        <div class="flex flex-col justify-center cursor-pointer" @click="handleOpenSite(item.site)">
          <div class="flex justify-start mb-5">
            <SvgIcon :icon="item.icon" :size="24" :style="{ color: item?.color }" class="mr-5" />
            <h3 class="m-0">{{ item.name }}</h3>
          </div>

          <p class="m-5 line-clamp-2">{{ item.description }}</p>
          <div class="flex justify-end">
            <span>{{ item.author }}</span>
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
