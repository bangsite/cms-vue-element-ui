import type { App } from "vue";
import VueApexCharts from "vue3-apexcharts";

export function libApexCharts(app: App<Element>) {
    app.use(VueApexCharts);
    app.component("ApexChart", VueApexCharts);
}
