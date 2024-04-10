<template>
  <el-card :bordered="false" class="rounded-xl">
    <div :class="`overview-card overview-card-${ocData.type}`">
      <div class="overview-card__top flex items-center justify-between gap-4 mb-2">
        <div class="overview-card__top--content">
          <template v-if="halfCircleIcon">
            <span class="text-base">{{ ocData.label }}</span>
            <h4 class="text-2xl md:text-3xl font-medium mb-1">
              <vue3-autocounter
                ref="counter"
                :startAmount="0"
                :endAmount="didViewCountUp ? Number(ocData.total) : 0"
                :duration="2"
                :prefix="ocData.prefix"
                :suffix="ocData.suffix"
                separator=","
                decimalSeparator="."
                :decimals="ocData.decimal"
                :autoinit="true"
              />
            </h4>
          </template>
          <template v-else>
            <h4 class="text-2xl md:text-3xl font-bold mb-1">
              <CountUp
                ref="counter"
                :startVal="0"
                :endVal="didViewCountUp ? Number(ocData.total) : 0"
                :duration="2"
                :prefix="ocData.prefix"
                :suffix="ocData.suffix"
                :decimals="ocData.decimal"
              />
            </h4>
            <span class="overview-label text-base">{{ ocData.label }}</span>
          </template>
        </div>
        <div class="flex items-center justify-center w-16 h-16 rounded-xl" :class="`bg-${ocData.type}`">
          <SvgIcon :icon="`${ocData.icon}`" :size="24" />
        </div>
      </div>

      <div v-if="bottomStatus" class="overview-card__bottom flex items-center gap-4 px-1 py-2 bg-gray-50 rounded-lg">
        <span class="flex items-center gap-1" :class="ocData.growth === 'upward' ? 'text-success' : 'text-danger'">
          <SvgIcon :icon="ocData.growth === 'upward' ? 'pajamas:arrow-up' : 'pajamas:arrow-down'" size="16" />
          <span> {{ ocData.growthRate }}%</span>
        </span>
        <span class="status-label text-[14px]">{{ ocData.dataPeriod }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import VueTypes from "vue-types";
import CountUp from "vue-countup-v3";

import SvgIcon from "@/components/common/SvgIcon.vue";

const props = defineProps({
  ocData: VueTypes.object.def({
    id: "1",
    type: "primary",
    icon: "uil:briefcase-alt",
    total: "100",
    suffix: "+",
    prefix: "",
    label: "Total Products",
    growth: "downward",
    growthRate: "15.65",
    dataPeriod: "Since Last Month",
    decimal: 0,
  }),
  bottomStatus: VueTypes.bool.def(true),
  contentFirst: VueTypes.bool.def(true),
  halfCircleIcon: VueTypes.bool.def(false),
});

const didViewCountUp = ref(false);

onMounted(() => {
  setTimeout(() => {
    didViewCountUp.value = true;
  }, 200);
});
</script>
