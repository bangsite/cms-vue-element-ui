<template>
  <ASkeleton :loading="loading" active>
    <ACard>
      <ARow :gutter="16" class="flex-align-center">
        <ACol :span="16">
          <div class="flex flex-align-center">
            <div class="work__top-avatar">
              <SvgIcon :icon="'logos:mps-icon'" :size="24" />
            </div>

            <div class="work__top-para">
              <h3>Good morning, {{ auth?.userInfo?.name }}, today is another day full of energy!</h3>
              <p>Cloudy to sunny today, 20°C - 25°C!</p>
            </div>
          </div>
        </ACol>

        <ACol :span="8" justify="space-between">
          <div class="work__top-statistic">
            <AStatistic v-for="item in statisticData" :key="item.id" :title="item.label" :value="item.value" />
          </div>
        </ACol>
      </ARow>
      <!--      <div class="flex"></div>-->
    </ACard>
  </ASkeleton>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import SvgIcon from "@/components/common/SvgIcon.vue";

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
