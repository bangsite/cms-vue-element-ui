<template>
  <div class="chart">
    <ApexChart width="100%" height="350" type="bar" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const chartOptions = reactive({
  title: {
    text: "Chart Bar Columns",
    align: "left",
  },
  chart: {
    type: "bar",
    id: "chart-column",
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  colors: ["#FFB74D", "#81C784", "#D32F2F"],
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },

  dataLabels: {
    enabled: false,
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ["Net Profit", "Revenue", "Free Cash Flow"],
    markers: {
      fillColors: ["#FFB74D", "#81C784", "#F44336"],
    },
  },
});

const series = reactive([
  {
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
]);
</script>
