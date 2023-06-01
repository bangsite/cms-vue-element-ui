<template>
  <ElRow :gutter="16" justify="space-between" :class="prefixCls">
    <ElCol :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-for="item in cardData" :key="item.id">
      <ElSkeleton :loading="loading" animated :rows="2">
        <GradientBackground :startColor="item.colors[0]" :endColor="item.colors[1]">
          <h3>{{ item.title }}</h3>
          <div class="flex flex-center-space">
            <SvgIcon :icon="item.icon" :size="32" />
            <h4>
              <CountTo :prefix="item.unit" :startAmount="1" :endAmount="item.value" />
            </h4>
          </div>
        </GradientBackground>
      </ElSkeleton>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useDesign } from "@/hooks/web/useDesign";
import { getCountApi } from "@/core/services/modules/dashboard.service";

import type { AnalysisTotalTypes } from "@/types/analysis";

import CountTo from "@/components/CountTo.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import GradientBackground from "@/components/GradientBackground.vue";

const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls("panel");
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
<style lang="scss" scoped>
@import "@/assets/scss/settings/_variable.module.scss";

$prefix-cls: "#{$namespace}-panel";

.#{prefix-cls} {
  &__item {
    &--peoples {
      color: #40c9c6;
    }

    &--message {
      color: #36a3f7;
    }

    &--money {
      color: #f4516c;
    }

    &--shopping {
      color: #34bfa3;
    }

    &:hover {
      :deep(.#{$namespace}-icon) {
        color: #fff !important;
      }

      .#{prefix-cls}__item--icon {
        transition: all 0.38s ease-out;
      }

      .#{prefix-cls}__item--peoples {
        background: #40c9c6;
      }

      .#{prefix-cls}__item--message {
        background: #36a3f7;
      }

      .#{prefix-cls}__item--money {
        background: #f4516c;
      }

      .#{prefix-cls}__item--shopping {
        background: #34bfa3;
      }
    }
  }
}
</style>
