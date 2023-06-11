<template>
  <ElSkeleton :loading="loading" animated>
    <ElCard>
      <ElRow :gutter="16" justify="space-between" class="flex-align-center">
        <ElCol :span="16">
          <div class="flex flex-align-center">
            <div class="work__top-avatar">
              <SvgIcon :icon="'logos:mps-icon'" :size="24" />
            </div>

            <div class="work__top-para">
              <h3>Good morning, {{ auth.userInfo.name }}, today is another day full of energy!</h3>
              <p>Cloudy to sunny today, 20°C - 25°C!</p>
            </div>
          </div>
        </ElCol>

        <ElCol :span="8" justify="space-between">
          <div class="work__top-statistic">
            <ElStatistic v-for="item in statisticData" :key="item.id" :title="item.label" :value="item.value" />
          </div>
        </ElCol>
      </ElRow>
      <!--      <div class="flex"></div>-->
    </ElCard>
  </ElSkeleton>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/core/stores/modules/auth.store";

interface StatisticData {
  id: number;
  label: string;
  value: string;
}
const auth = useAuthStore();

const loading = ref(true);
const statisticData: StatisticData[] = [
  {
    id: 0,
    label: "number of items",
    value: "25",
  },
  {
    id: 1,
    label: "to do",
    value: "4/16",
  },
  {
    id: 2,
    label: "message",
    value: "12",
  },
];

onMounted(() => {
  loading.value = false;
});
</script>
