<template>
  <div class="analysis">
    <div class="analysis__top">
      <AnalysisSummary />
      <AnalysisChart />
    </div>
    <div class="analysis__card">
      <AnalysisPanelGroup />
    </div>
    <div class="analysis__bottom">
      <AnalysisBottom />
    </div>
  </div>
</template>
<script setup lang="ts">
import AnalysisSummary from "@/views/Dashboard/components/AnalysisSummary.vue";
import AnalysisChart from "@/views/Dashboard/components/AnalysisChart.vue";
import AnalysisPanelGroup from "@/views/Dashboard/components/AnalysisPanelGroup.vue";
import AnalysisBottom from "@/views/Dashboard/components/AnalysisBottom.vue";
</script>
