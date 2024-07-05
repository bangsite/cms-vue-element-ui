<template>
  <canvas :class="className" :id="id" :style="style" :height="height"></canvas>
</template>
<script lang="ts" setup>
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";
import { onBeforeUnmount, onMounted, ref, toRefs } from "vue";
import { customTooltips } from "@/utils/chartUtilities";
import type { IChartJS } from "@/types";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

// const props = defineProps<IChartJS>();
const props = withDefaults(defineProps<IChartJS>(), {
  style: () => ({ marginBottom: "20px" }),
  datasets: () => [],
});
const { type, datasets, options, labels, id, tooltip, scales, elements, legend, layout, height, className, style } =
  toRefs(props);
const chartInstance = ref<Chart | null>(null);

const createChart = () => {
  console.log("createChart");
  if (!chartInstance.value) {
    const chartElement = document.getElementById(`${id.value}`) as HTMLCanvasElement;
    if (chartElement) {
      chartInstance.value = new Chart(chartElement, {
        type: type.value,
        data: {
          labels: labels.value,
          datasets: datasets.value,
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: layout.value,
          hover: {
            mode: "index",
            intersect: false,
          },
          plugins: {
            legend: legend.value,
            tooltip: {
              yAlign: "bottom",
              mode: "index",
              intersect: false,
              backgroundColor: "#ffffff",
              boxShadow: "0 8px 5px #ADB5D915",
              position: "average",
              titleColor: "#ADB5D9",
              color: "#ADB5D9",
              titleFontSize: 12,
              titleSpacing: 10,
              bodyColor: "#404040",
              bodyFontSize: 11,
              bodyFontStyle: "normal",
              bodyFontFamily: "'Jost', sans-serif",
              borderColor: "#F1F2F6",
              usePointStyle: true,
              borderWidth: 1,
              bodySpacing: 10,
              padding: {
                x: 10,
                y: 8,
              },
              z: 999999,
              enabled: false,
              external: customTooltips,
              ...tooltip.value,
            },
          },
          elements: elements.value,
          scales: scales.value,
          ...options.value,
        },
      });
    }
  }
};

const updateChart = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

onMounted(() => {
  setTimeout(() => createChart(), 20);
  window.addEventListener("resize", updateChart);
});

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
    chartInstance.value = null;
  }
  window.removeEventListener("resize", updateChart);
});
</script>
