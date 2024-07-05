<template>
  <el-card shadow="hover" class="rounded-lg">
    <template #header>
      <div class="flex items-center justify-between cursor-pointer">
        <h4 class="title">Activity</h4>
        <a href="#">More news</a>
      </div>
    </template>
    <div class="flex flex-col gap-2 mb-4">
      <div v-for="item in data" :key="item.id" class="flex gap-2">
        <div class="bg-blue-500/10 flex items-center justify-center w-[60px] h-[60px] rounded-full flex-shrink-0">
          <SvgIcon :icon="'logos:mps-icon'" :size="24" />
        </div>
        <el-link href="#">{{ item.content }}</el-link>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

import { DATA_WORK_ACTIVITY } from "@/db";

const data = computed(() => DATA_WORK_ACTIVITY);
</script>

<style scoped lang="scss"></style>
