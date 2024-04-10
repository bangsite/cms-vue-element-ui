<template>
  <div>
    <el-row :gutter="25">
      <el-col :xxl="12"><OverviewDataList /></el-col>

      <el-col :xxl="12" :xl="12" :xs="24">
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

      <el-col :xxl="8" :xl="12" :xs="24">
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

      <el-col :xxl="16" :xs="24">
        <Suspense>
          <template #default>
            <SalesByLocation />
          </template>
          <template #fallback>
            <el-card headless>
              <el-skeleton active />
            </el-card>
          </template>
        </Suspense>
      </el-col>

      <el-col :xxl="12" :xs="24">
        <Suspense>
          <template #default>
            <TopSellingProduct />
          </template>
          <template #fallback>
            <el-card headless>
              <el-skeleton active />
            </el-card>
          </template>
        </Suspense>
      </el-col>

      <el-col :xxl="12" :xs="24">
        <Suspense>
          <template #default>
            <BrowsersState />
          </template>
          <template #fallback>
            <el-card headless>
              <el-skeleton active />
            </el-card>
          </template>
        </Suspense>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import OverviewDataList from "@/views/Dashboard/components/OverviewDataList.vue";
// import SalesReport from "@/views/Dashboard/components/SalesReport.vue";
</script>
