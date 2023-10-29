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
import ChartLine from "@/components/charts/ChartLine.vue";
import ChartColumn from "@/components/charts/ChartColumn.vue";
import ChartArea from "@/components/charts/ChartArea.vue";
import ChartTimeline from "@/components/charts/ChartTimeline.vue";
</script>
