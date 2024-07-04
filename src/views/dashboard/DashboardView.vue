<template>
  <el-row :gutter="20">
    <el-col>
      <OverviewDataList />
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xs="24" :lg="12" :md="24" :xl="12" class="mb-[20px]">
      <Suspense>
        <template #default>
          <SalesReport />
        </template>
        <template #fallback>
          <el-card headless>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>
    <el-col :xs="24" :lg="12" :md="24" :xl="12" class="mb-[20px]">
      <Suspense>
        <template #default>
          <SalesGrowth />
        </template>
        <template #fallback>
          <el-card headless>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xl="12" :lg="12" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <LatestTransection />
        </template>
        <template #fallback>
          <el-card headless>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>

    <el-col :xl="12" :lg="12" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <UpcomingEvents />
        </template>
        <template #fallback>
          <el-card headless>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :xl="24" :md="24" :xs="24" class="mb-[20px]">
      <Suspense>
        <template #default>
          <BestSellers />
        </template>
        <template #fallback>
          <el-card headless>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import OverviewDataList from "@/views/dashboard/components/OverviewDataList.vue";
import SalesReport from "@/views/dashboard/components/SalesReport.vue";
import SalesGrowth from "@/views/dashboard/components/SalesGrowth.vue";
import BestSellers from "@/views/dashboard/components/BestSellers.vue";
import LatestTransection from "@/views/dashboard/components/LatestTransection.vue";
import UpcomingEvents from "@/views/dashboard/components/UpcomingEvents.vue";
</script>
