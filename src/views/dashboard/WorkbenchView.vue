<template>
  <el-row :gutter="20">
    <el-col :xl="17" :lg="17" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WeatherDaily />
        </template>
        <template #fallback>
          <el-skeleton :rows="6" animated />
        </template>
      </Suspense>
    </el-col>
    <el-col :xl="7" :lg="7" :md="24" :xs="24" class="mb-[20px]">
      <WorkbenchBanner />
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :xl="14" :lg="14" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WorkbenchTechCard />
        </template>
        <template #fallback>
          <el-skeleton :rows="8" animated />
        </template>
      </Suspense>
    </el-col>
    <el-col :xl="10" :lg="10" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <WorkbenchShortcut />
        </template>
        <template #fallback>
          <el-skeleton :rows="8" animated />
        </template>
      </Suspense>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <WorkbenchActivity />
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import WeatherDaily from "@/views/dashboard/components/WeatherDaily.vue";
import WorkbenchTechCard from "@/views/dashboard/components/WorkbenchTechCard.vue";
import WorkbenchShortcut from "@/views/dashboard/components/WorkbenchShortcut.vue";
import WorkbenchBanner from "@/views/dashboard/components/WorkbenchBanner.vue";
import WorkbenchActivity from "@/views/dashboard/components/WorkbenchActivity.vue";
</script>
