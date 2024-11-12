<template>
  <el-card shadow="hover" class="rounded-md">
    <template #header><h4 class="title">Shortcuts</h4></template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 h-full min-h-[24rem]">
      <template v-for="item in data" :key="item.id">
        <div
          class="border border-gray-200 flex flex-col items-center justify-center rounded-md drop-shadow-2xl hover:drop-shadow-md"
        >
          <SvgIcon :icon="item.icon" :size="32" :style="{ color: item.color }" />
          <p class="line-clamp-3">{{ item.label }}</p>
        </div>
      </template>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { DATA_WORK_SHORTCUT } from "@/db";

const data = computed(() => DATA_WORK_SHORTCUT);
</script>
