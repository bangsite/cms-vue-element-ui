<template>
  <div class="chart">
    <ApexChart :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { reactive } from "vue";

const chartOptions = reactive({
    title: {
        text: "Chart Area",
        align: "left",
    },
    chart: {
        type: "area",
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        markers: {
            size: 0,
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
        stroke: {
            curve: "smooth",
        },
    },
    dataLabels: {
        enabled: false,
    },

    xaxis: {
        title: {
            text: "Time",
        },
        type: "datetime",
        categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
        ],
    },
    tooltip: {
        x: {
            format: "dd/MM/yy HH:mm",
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
    },
});

const series = reactive([
    {
        name: "Series 1",
        data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
        name: "Series 2",
        data: [11, 32, 45, 32, 34, 52, 41],
    },
]);
</script>
