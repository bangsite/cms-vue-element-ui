<template>
  <el-row :gutter="15">
    <el-col :span="16">
      <WorkbenchTechCard />

      <el-card shadow="hover" class="work__main-activity">
        <template #header>
          <div class="card-header">
            <span>Dynamic</span>
            <a href="#">More news</a>
          </div>
        </template>

        <el-descriptions title="Activity">
          <el-descriptions-item v-for="item in WorkActivityData" :key="item.id">
            <el-row :gutter="15" justify="start" align="middle" class="mb-10">
              <el-col :span="2">
                <el-avatar class="avatar" src="#">
                  <SvgIcon :icon="'logos:mps-icon'" :size="24" />
                </el-avatar>
              </el-col>
              <el-col :span="22">
                <el-link href="#">{{ item.content }}</el-link>
              </el-col>
            </el-row>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="8">
      <WorkbenchShortcut />

      <IconWorkbenchBanner />
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { WorkActivity } from "@/data/workbench.data";
import WorkbenchTechCard from "@/views/Dashboard/components/WorkbenchTechCard.vue";
import WorkbenchShortcut from "@/views/Dashboard/components/WorkbenchShortcut.vue";
import IconWorkbenchBanner from "@/components/svgs/IconWorkbenchBanner.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

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
