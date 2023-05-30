<template>
  <PanelGroup />
  <ElRow :gutter="20" justify="space-between">
    <ElCol :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :options="pieOptionsData" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :xl="14" :lg="14" :md="24" :sm="24" :xs="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated>
          <Echart :options="barOptionsData" :height="300" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
    <ElCol :span="24">
      <ElCard shadow="hover" class="mb-20px">
        <ElSkeleton :loading="loading" animated :rows="4">
          <Echart :options="lineOptionsData" :height="350" />
        </ElSkeleton>
      </ElCard>
    </ElCol>
  </ElRow>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { set } from "lodash-es";
import type { EChartsOption } from "echarts";
import { useI18n } from "@/hooks/web/useI18n";
import { getUserAccessSourceApi, getWeeklyUserActivityApi, getMonthlySalesApi } from "@/core/services/modules/dashboard.service";
import PanelGroup from "@/views/Dashboard/components/PanelGroup.vue";
import Echart from "@/components/Charts/Echart.vue";

import { pieOptions, barOptions, lineOptions } from "@/data/echarts.data";

const { t } = useI18n();
const loading = ref(true);

const pieOptionsData = reactive<EChartsOption>(pieOptions) as EChartsOption;
const barOptionsData = reactive<EChartsOption>(barOptions) as EChartsOption;
const lineOptionsData = reactive<EChartsOption>(lineOptions) as EChartsOption;

const getUserAccessSource = async () => {
    const res = await getUserAccessSourceApi().catch(() => {})
    if (res) {
        set(
            pieOptionsData,
            'legend.data',
            res.data.map((v) => t(v.name))
        )
        pieOptionsData!.series![0].data = res.data.map((v) => {
            return {
                name: t(v.name),
                value: v.value
            }
        })
    }
}
const getWeeklyUserActivity = async () => {
    const res = await getWeeklyUserActivityApi().catch(() => {})
    if (res) {
        set(
            barOptionsData,
            'xAxis.data',
            res.data.map((v) => t(v.name))
        )
        set(barOptionsData, 'series', [
            {
                name: t('analysis.activeQuantity'),
                data: res.data.map((v) => v.value),
                type: 'bar'
            }
        ])
    }
}

const getMonthlySales = async () => {
  const res = await getMonthlySalesApi().catch(() => {});
  if (res) {
    set(
      lineOptionsData,
      "xAxis.data",
      res.data.map((v) => t(v.name))
    );
    set(lineOptionsData, "series", [
      {
        name: t("analysis.estimate"),
        smooth: true,
        type: "line",
        data: res.data.map((v) => v.estimate),
        animationDuration: 2800,
        animationEasing: "cubicInOut",
      },
      {
        name: t("analysis.actual"),
        smooth: true,
        type: "line",
        itemStyle: {},
        data: res.data.map((v) => v.actual),
        animationDuration: 2800,
        animationEasing: "quadraticOut",
      },
    ]);
  }
};
const getAllApi = async () => {
  await Promise.all([getUserAccessSource(), getWeeklyUserActivity(), getMonthlySales()]);
  loading.value = false;
};

getAllApi();
</script>
