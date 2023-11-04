<template>
  <el-row :gutter="15">
    <el-col :xl="6" :md="12" :sm="24" class="mb-15" v-for="item in cardData" :key="item.id">
      <el-skeleton :loading="loading" active :rows="2">
        <GradientBackground :startColor="item.colors[0]" :endColor="item.colors[1]">
          <h3>{{ item.title }}</h3>
          <div class="flex flex-center-space">
            <SvgIcon :icon="item.icon" :size="32" />
            <h4>
              <CountTo :prefix="item.unit" :startAmount="1" :endAmount="item.value" />
            </h4>
          </div>
        </GradientBackground>
      </el-skeleton>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCountApi } from "@/services/modules/dashboard.service";

import type { AnalysisTotalTypes } from "@/types/analysis";

import CountTo from "@/components/common/CountTo.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import GradientBackground from "@/components/common/GradientBackground.vue";

const loading = ref(true);

const cardData: AnalysisTotalTypes[] = [
  {
    id: "visit",
    title: "Views",
    value: 1000000,
    unit: "",
    colors: ["#ec4786", "#b955a4"],
    icon: "healthicons:chart-line-outline",
  },
  {
    id: "amount",
    title: "Turnover",
    value: 234567.89,
    unit: "$",
    colors: ["#865ec0", "#5144b4"],
    icon: "ant-design:money-collect-outlined",
  },
  {
    id: "download",
    title: "Downloads",
    value: 666666,
    unit: "",
    colors: ["#56cdf3", "#719de3"],
    icon: "formkit:download",
  },
  {
    id: "trade",
    title: "Transactions",
    value: 999999,
    unit: "",
    colors: ["#fcbc25", "#f68057"],
    icon: "ant-design:transaction-outlined",
  },
];

onMounted(() => {
  getCount();
  loading.value = false;
});

const getCount = async () => {
  const res = await getCountApi().catch((err) => {
    console.log(err);
    loading.value = false;
  });
  if (res) {
    console.log(res);
  }
};
</script>
<style lang="scss" scoped></style>
