<template>
  <div class="overview">
    <div class="overview__wrap">
      <ChartLine />
      <ChartArea />
    </div>
    <div class="overview__wrap">
      <ChartColumn />
      <ChartTimeline />
    </div>
  </div>
</template>
<script setup lang="ts">
import ChartLine from "@/components/chart/ChartLine.vue";
import ChartColumn from "@/components/chart/ChartColumn.vue";
import ChartArea from "@/components/chart/ChartArea.vue";
import ChartTimeline from "@/components/chart/ChartTimeline.vue";
</script>
