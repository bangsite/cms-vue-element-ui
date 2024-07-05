<template>
  <el-card :bordered="false" class="rounded-lg p-1">
    <div :class="`overview-card overview-card-${data.type}`">
      <div class="overview-card__top flex items-center justify-between gap-4 mb-6">
        <div class="overview-card__top--content">
          <template v-if="halfCircleIcon">
            <span class="text-base">{{ data.label }}</span>
            <h4 class="text-2xl md:text-3xl font-medium mb-1">
              <VueCountUp
                ref="counter"
                :loop="true"
                :startAmount="0"
                :endAmount="didViewCountUp ? Number(data.total) : 0"
                :duration="2"
                :prefix="data.prefix"
                :suffix="data.suffix"
                separator=","
                decimalSeparator="."
                :decimals="data.decimal"
                :autoinit="true"
              />
            </h4>
          </template>
          <template v-else>
            <h4 class="text-2xl md:text-3xl font-bold mb-1">
              <VueCountUp
                ref="counter"
                :startVal="0"
                :endVal="didViewCountUp ? Number(data.total) : 0"
                :duration="2"
                :options="options"
              />
            </h4>
            <span class="overview-label text-base">{{ data.label }}</span>
          </template>
        </div>
        <div class="flex items-center justify-center w-16 h-16 rounded-lg" :class="`bg-${data.type}`">
          <SvgIcon :icon="`${data.icon}`" :size="24" />
        </div>
      </div>

      <div v-if="bottomStatus" class="overview-card__bottom flex items-center gap-4 px-1 py-2 bg-gray-50 rounded-lg">
        <span class="flex items-center gap-1" :class="data.growth === 'upward' ? 'text-success' : 'text-danger'">
          <SvgIcon :icon="data.growth === 'upward' ? 'pajamas:arrow-up' : 'pajamas:arrow-down'" :size="16" />
          <span> {{ data?.growthRate }}%</span>
        </span>
        <span class="status-label text-[14px]">{{ data?.dataPeriod }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { CountUpOptions } from "vue-countup-v3";

import SvgIcon from "@/components/common/SvgIcon.vue";

interface IStatsCard {
  id: string;
  type: string;
  icon: string;
  total: string;
  label: string;
  growth: string;
  growthRate: string;
  dataPeriod: string;
}

defineProps({
  data: {
    type: Object as () => IStatsCard,
    default: () => ({
      id: "1",
      type: "primary",
      icon: "uil:briefcase-alt",
      total: "100",
      label: "Total Products",
      growth: "downward",
      growthRate: "15.65",
      dataPeriod: "Since Last Month",
    }),
  },
  options: {
    type: Object as () => CountUpOptions,
    default: () => ({
      suffix: "+",
      prefix: "",
      decimal: 0,
    }),
  },
  bottomStatus: {
    type: Boolean,
    default: true,
  },
  contentFirst: {
    type: Boolean,
    default: true,
  },
  halfCircleIcon: {
    type: Boolean,
    default: false,
  },
});

const didViewCountUp = ref(false);

onMounted(() => {
  setTimeout(() => {
    didViewCountUp.value = true;
  }, 200);
});
</script>
