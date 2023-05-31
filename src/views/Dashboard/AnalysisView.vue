<template>
  <!--  <PanelGroup />-->
  <div class="analysis">
    <ElRow class="analysis__chart" :gutter="15">
      <ElCol :md="24" :lg="6">
        <SummaryView />
      </ElCol>
      <ElCol :md="24" :lg="18">
        <ChartView />
      </ElCol>
    </ElRow>
  </div>
</template>
<script setup lang="ts">
import SummaryView from "@/views/Dashboard/components/SummaryView.vue";
import ChartView from "@/views/Dashboard/components/ChartView.vue";
</script>
