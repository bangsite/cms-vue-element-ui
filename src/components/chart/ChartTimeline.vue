<template>
  <div class="chart">
    <ApexChart :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const chartOptions = reactive({
    title: {
        text: "Chart Timeline",
        align: "left",
    },

    chart: {
        type: "rangeBar",
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        stroke: {
            curve: "smooth",
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true,
            dataLabels: {
                hideOverflowingLabels: false,
            },
        },
    },

    xaxis: {
        type: "datetime",
    },
    grid: {
        row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1,
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
    },
});

const series = reactive([
    {
        data: [
            {
                x: "Code",
                y: [new Date("20023-03-02").getTime(), new Date("2023-03-04").getTime()],
                fillColor: "#008FFB",
            },
            {
                x: "Test",
                y: [new Date("2023-03-04").getTime(), new Date("2023-03-08").getTime()],
            },
            {
                x: "Validation",
                y: [new Date("2023-03-08").getTime(), new Date("2023-03-12").getTime()],
            },
            {
                x: "Deployment",
                y: [new Date("2023-03-12").getTime(), new Date("2023-03-18").getTime()],
                fillColor: "#FF4560",
            },
        ],
    },
]);
</script>
