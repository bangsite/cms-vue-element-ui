<template>
  <ElRow :gutter="16">
    <ElCol :span="16">
      <ElCard shadow="hover" class="mb-15">
        <template #header>
          <div class="card-header">
            <span>Project main technology stack</span>
            <ElButton class="text-primary" href="javascript:void(0)">More tech stacks</ElButton>
          </div>
        </template>
        <div class="work__main-tech">
          <WorkbenchTechCard v-bind="item" v-for="item in WorkTechData" :key="item.id" />
        </div>
      </ElCard>
      <ElCard shadow="hover" class="work__main-activity">
        <template #header>
          <div class="card-header">
            <span>Dynamic</span>
            <ElButton class="text-primary" href="javascript:void(0)">More news</ElButton>
          </div>
        </template>
        <div v-for="item in WorkActivityData" :key="item.id">
          <div class="flex flex-start">
            <div class="avatar">
              <SvgIcon :icon="'logos:mps-icon'" :size="24" />
            </div>
            <div class="flex flex-col">
              <p class="m-0">{{ item.content }}</p>
              <span>{{ item.time }}</span>
            </div>
          </div>

          <el-divider class="my-15" />
        </div>
      </ElCard>
    </ElCol>
    <ElCol :span="8">
      <ElCard shadow="hover" class="mb-15">
        <template #header>
          <div class="card-header">
            <span>Shortcuts</span>
          </div>
        </template>
        <div class="work__main-shortcut">
          <WorkbenchShortcut v-bind="item" v-for="item in WorkShortcutsData" :key="item.id" />
        </div>
      </ElCard>
      <ElCard shadow="hover" class="work__main-banner">
        <template #header>
          <div class="card-header">
            <span>Creativity</span>
          </div>
        </template>
        <IconWorkbenchBanner />
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { WorkTech, WorkShortcuts, WorkActivity } from "@/data/workbench.data";
import WorkbenchTechCard from "@/views/Dashboard/components/WorkbenchTechCard.vue";
import WorkbenchShortcut from "@/views/Dashboard/components/WorkbenchShortcut.vue";
import IconWorkbenchBanner from "@/components/icons/IconWorkbenchBanner.vue";
import SvgIcon from "@/components/SvgIcon.vue";
const WorkTechData = computed(() => WorkTech);
const WorkShortcutsData = computed(() => WorkShortcuts);
const WorkActivityData = computed(() => WorkActivity);
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
