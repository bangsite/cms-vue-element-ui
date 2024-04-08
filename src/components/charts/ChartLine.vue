<template>
  <div class="chart">
    <ApexChart :options="chartOptions" :series="series" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const chartOptions = reactive({
    title: {
        text: "Chart Line",
        align: "left",
    },

    chart: {
        colors: ["#336699", "#6699ff"],

        type: "line",
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
        },

        markers: {
            size: 1,
        },

        stroke: {
            curve: "smooth",
        },

        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: true,
                opacityTo: 10,
                stops: [10, 90, 100],
            },
        },
    },
    grid: {
        borderColor: "transparent",
        row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.4,
        },
    },
    dataLabels: {
        enabled: true,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
            text: "Month",
        },
    },
    yaxis: {
        title: {
            text: "Temperature",
        },
        min: 5,
        max: 200,
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
        name: "High - 2013",
        data: [118, 190, 93, 180, 132, 72, 190],
    },
    {
        name: "Low - 2013",
        data: [12, 50, 64, 18, 17, 100, 130],
    },
]);
</script>
