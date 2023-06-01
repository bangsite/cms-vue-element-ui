<template>
  <div class="analysis">
    <div class="analysis__top">
      <SummaryView />
      <ChartView />
    </div>
    <div class="analysis__card">
      <PanelGroup />
    </div>
    <div class="analysis__bottom">
      <AnalysisBottom />
    </div>
  </div>
</template>
<script setup lang="ts">
import SummaryView from "@/views/Dashboard/components/SummaryView.vue";
import ChartView from "@/views/Dashboard/components/ChartView.vue";
import PanelGroup from "@/views/Dashboard/components/PanelGroup.vue";
import AnalysisBottom from "@/views/Dashboard/components/AnalysisBottom.vue";
</script>
