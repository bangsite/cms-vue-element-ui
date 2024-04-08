<template>
  <el-card shadow="hover" class="mb-15">
    <template #header>Shortcuts</template>
    <div class="work__main-shortcut">
      <el-card hoverable shadow="hover" v-for="item in WorkShortcutsData" :key="item.id">
        <div class="flex flex-col items-center">
          <SvgIcon :icon="item.icon" :size="32" :style="{ color: item.color }" />
          <p class="line-clamp-3">{{ item.label }}</p>
        </div>
      </el-card>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { WorkShortcuts } from "@/data/workbench.data";

const WorkShortcutsData = computed(() => WorkShortcuts);
</script>
