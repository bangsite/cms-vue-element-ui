<template>
  <el-skeleton :loading="isLoading" :rows="3" animated>
    <template #template>
      <el-card>
        <el-skeleton-item variant="text" style="width: 30%" />
        <el-skeleton-item variant="text" style="width: 80%; margin-right: 16px" />
        <el-skeleton-item variant="text" style="margin-right: 16px" />
      </el-card>
    </template>
    <template #default>
      <el-card>
        <el-row justify="space-between" align="middle" class="mb-10">
          <div class="flex flex-col">
            <el-row :gutter="20" justify="start" align="middle">
              <img :src="currentWeather.condition.icon" alt="icon" :width="48" />
              <span>
                <strong style="font-size: 34px">
                  {{ currentWeather.temp_c }}
                </strong>
                <sup style="font-size: 20px">°C</sup>
              </span>
            </el-row>
            <span>{{ currentWeather.condition.text }}</span>
          </div>
          <div class="flex flex-col">
            <div>
              <span>Wind Status: </span>
              <span>
                <strong style="font-size: 20px">
                  {{ currentWeather.wind_kph }}
                </strong>
                <strong>km/h</strong>
              </span>
            </div>
            <div>
              <span>Humidity: </span>
              <span>
                <strong style="font-size: 20px">
                  {{ currentWeather.humidity }}
                </strong>
                <strong>%</strong>
              </span>
            </div>
          </div>
          <div class="flex flex-col">
            <div>
              <span>Clouds: </span>
              <span>
                <strong style="font-size: 20px">
                  {{ currentWeather.cloud }}
                </strong>
                <strong>%</strong>
              </span>
            </div>
            <div>
              <span>UV Index: </span>
              <span>
                <strong style="font-size: 20px">{{ currentWeather.uv }}</strong>
              </span>
            </div>
          </div>
          <div class="flex flex-col">
            <span>{{ locationWeather.name }}</span>
            <span>{{ dateFull(locationWeather.localtime) }}</span>
          </div>
        </el-row>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import useWorkBench from "@/composables/useWorkBench";
import { dateFull } from "@/utils/formatDateTime";

const { fetchWeather, response, errors, isLoading } = useWorkBench();

const currentWeather = computed(() => response.value?.current);
const locationWeather = computed(() => response.value?.location);

onBeforeMount(async () => {
  await fetchWeather();
});
</script>
