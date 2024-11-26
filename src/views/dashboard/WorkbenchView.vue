<template>
  <el-row :gutter="20">
    <el-col :xl="17" :lg="17" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WeatherDaily />
        </template>
        <template #fallback>
          <el-card class="rounded-md">
            <el-skeleton :rows="7" animated />
          </el-card>
        </template>
      </Suspense>
    </el-col>
    <el-col :xl="7" :lg="7" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WorkbenchBanner />
        </template>
        <template #fallback>
          <el-card class="rounded-md">
            <el-skeleton :rows="7" animated />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :xl="14" :lg="14" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WorkbenchTechCard />
        </template>
        <template #fallback>
          <el-card class="rounded-md">
            <el-skeleton :rows="7" animated />
          </el-card>
        </template>
      </Suspense>
    </el-col>
    <el-col :xl="10" :lg="10" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WorkbenchShortcut />
        </template>
        <template #fallback>
          <el-card class="rounded-md">
            <el-skeleton :rows="7" animated />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <Suspense>
        <template #default>
          <WorkbenchActivity />
        </template>
        <template #fallback>
          <el-card class="rounded-md">
            <el-skeleton :rows="7" animated />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const WeatherDaily = defineAsyncComponent(() => import("@/views/dashboard/components/WeatherDaily.vue"));
const WorkbenchTechCard = defineAsyncComponent(() => import("@/views/dashboard/components/WorkbenchTechCard.vue"));
const WorkbenchShortcut = defineAsyncComponent(() => import("@/views/dashboard/components/WorkbenchShortcut.vue"));
const WorkbenchBanner = defineAsyncComponent(() => import("@/views/dashboard/components/WorkbenchBanner.vue"));
const WorkbenchActivity = defineAsyncComponent(() => import("@/views/dashboard/components/WorkbenchActivity.vue"));
</script>
