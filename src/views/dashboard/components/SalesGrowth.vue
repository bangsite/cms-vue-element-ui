<template>
  <div class="chartjs-container" v-if="data && Object.keys(data).length > 0">
    <el-card class="rounded-md">
      <template #header>
        <div class="chartjs-tooltip flex items-center justify-between cursor-pointer">
          <h4 class="title">Sales Growth</h4>
          <div class="flex items-center">
            <el-button
              class="rounded-md"
              :type="overviewTab === 'today' ? 'primary' : ''"
              @click="handleTabActivation('today')"
              plain
            >
              Today
            </el-button>
            <el-button
              class="rounded-md"
              :type="overviewTab === 'week' ? 'primary' : ''"
              @click="handleTabActivation('week')"
              plain
            >
              Week
            </el-button>

            <el-button
              class="rounded-md"
              :type="overviewTab === 'month' ? 'primary' : ''"
              @click="handleTabActivation('month')"
              plain
            >
              Month
            </el-button>
          </div>
        </div>
      </template>

      <div class="sales-growth-chart">
        <div class="flex items-center gap-3 justify-center">
          <div
            class="label-detailed flex items-center gap-1"
            v-for="(item, index) in dataSalesGrowthDataset"
            :key="index"
          >
            <span :class="`label-type--${item?.labelType} text-sm`">{{ item?.label }}</span>
            <span :class="`${item.growthStatus === 'up' ? 'text-success' : 'text-danger'} text-sm flex items-center`">
              <SvgIcon :icon="'pajamas:arrow-up'" :size="16" v-if="item.growthStatus === 'up'" />
              <SvgIcon :icon="'pajamas:arrow-down'" :size="16" v-if="item.growthStatus === 'down'" />
              <strong>{{ item?.growthRate }}%</strong>
            </span>
          </div>
        </div>
        <template v-if="!isLoading">
          <Chart
            type="bar"
            id="sales-growth-chart"
            className="sales-growth-chart"
            :labels="data.labels"
            :datasets="dataSalesGrowthDataset"
            :height="heightChart"
            :layout="{ padding: { top: 20 } }"
            :scales="dataScalesGrowth"
            :tooltip="{
              external: customTooltips,
              ...tooltip,
            }"
          />
        </template>
        <template v-else>
          <el-skeleton :rows="3" animated />
        </template>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import Chart from "@/components/charts/ChartJS.vue";
import { customTooltips } from "@/utils/chartUtilities";

import { DATA_SALES_GROWTH, filterDataScales, filterSalesGrowthDataset } from "@/db/dataSalesGrowth";
import type { SalesGrowthDataset } from "@/types";

const overviewTab = ref("today");
const isLoading = ref(false);
const heightChart = ref(window.innerWidth < 575 ? 200 : 102);

const data: { [key: string]: any } = computed(() => {
  return DATA_SALES_GROWTH && Object.keys(DATA_SALES_GROWTH[overviewTab.value]).length > 0
    ? DATA_SALES_GROWTH[overviewTab.value]
    : {};
});
const dataScalesGrowth: { [key: string]: any } = computed(() => filterDataScales(data.value));
const dataSalesGrowthDataset = computed<SalesGrowthDataset[]>(() => filterSalesGrowthDataset(data.value));

const handleTabActivation = (value: string) => {
  isLoading.value = true;
  overviewTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};

const tooltip = () => ({
  usePointStyle: true,
  callbacks: {
    label(t: any) {
      const dstLabel = t.dataset.label;
      const { formattedValue } = t;
      return ` ${dstLabel}:${formattedValue}k`;
    },
    labelColor(t: any) {
      return {
        backgroundColor: t.dataset.hoverBackgroundColor,
        borderColor: "transparent",
      };
    },
  },
});
</script>
