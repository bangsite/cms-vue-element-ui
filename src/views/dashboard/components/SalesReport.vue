<template>
  <div class="chartjs-container" v-if="dataSalesReport">
    <el-card class="rounded-xl">
      <template #header>
        <div class="chartjs-tooltip flex items-center justify-between cursor-pointer">
          <h4 class="title">Sales Report</h4>
          <el-dropdown>
            <span class="el-dropdown-link outline-none">
              <SvgIcon :icon="'solar:menu-dots-linear'" :size="24" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="#" class="text-para">
                    <svg-icon name="print" width="16" />
                    <span>Printer</span>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="#" class="text-para">
                    <svg-icon name="book-open" width="16" />
                    <span>PDF</span>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="#" class="text-para">
                    <svg-icon name="file-alt" width="16" />
                    <span>Google Sheets</span>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item disabled>
                  <router-link to="#" class="text-para">
                    <svg-icon name="x" width="16" />
                    <span>Excel (XLSX)</span>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item disabled>
                  <router-link to="#" class="text-para">
                    <svg-icon name="file" width="16" />
                    <span>CSV</span>
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
      <div class="sales-revenue-lineChart">
        <div class="flex items-center gap-3 justify-center">
          <div
            class="label-detailed flex items-center gap-1"
            v-for="(item, index) in dataSalesRevenueDatasets"
            :key="index"
          >
            <span :class="`label-type--${item.labelType} text-sm`">{{ item.label }}</span>
            <strong class="total text-xl">{{ item.amount }}</strong>
            <span :class="`${item.growthStatus === 'up' ? 'text-success' : 'text-danger'} text-sm flex items-center`">
              <SvgIcon :icon="'pajamas:arrow-up'" :size="16" v-if="item.growthStatus === 'up'" />
              <SvgIcon :icon="'pajamas:arrow-down'" :size="16" v-if="item.growthStatus === 'down'" />
              <strong>{{ item.growthRate }}%</strong>
            </span>
          </div>
        </div>
        <template v-if="!isLoading">
          <Chart
            type="line"
            id="sales-revenue-chart"
            className="sales-revenue-chart"
            :labels="dataSalesReport.labels"
            :datasets="dataSalesRevenueDatasets"
            :scales="dataScales"
            :tooltip="{
              custom: customTooltips,
              ...tooltip,
            }"
            :height="heightChart"
          />
        </template>
        <template v-else>
          <el-skeleton :rows="5" animated />
        </template>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Chart from "@/components/charts/ChartJS.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { DATA_SCALES, SALES_REPORT_DATA, salesRevenueDatasets } from "@/db/salesReport";
import { customTooltips } from "@/utils/chartUtilities";

const dataScales = computed(() => DATA_SCALES);
const dataSalesReport = computed(() => SALES_REPORT_DATA);
const dataSalesRevenueDatasets = ref();
const heightChart = ref(window.innerWidth <= 575 ? 200 : 100);
const isLoading = ref(false);

const tooltip = () => ({
  usePointStyle: true,
  callbacks: {
    label(t: Record<string, any>) {
      const dstLabel = t.dataset.label;
      const { formattedValue } = t;
      return `  ${formattedValue} ${dstLabel}`;
    },
    labelColor(t: Record<string, any>) {
      return {
        backgroundColor: t.dataset.pointBackgroundColor,
        borderColor: "transparent",
      };
    },
  },
});

const renderChartSales = () => {
  isLoading.value = true;
  const elementSaleRevenue = document.getElementById("sales-revenue-chart");
  if (elementSaleRevenue) dataSalesRevenueDatasets.value = salesRevenueDatasets(elementSaleRevenue);
  if (dataSalesRevenueDatasets.value) isLoading.value = false;
};

onMounted(() => {
  renderChartSales();
});
</script>
