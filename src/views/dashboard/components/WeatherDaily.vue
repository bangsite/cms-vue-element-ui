<template>
  <template v-if="!isLoading">
    <el-card shadow="hover" class="rounded-md">
      <el-row justify="space-between" align="middle">
        <el-col>
          <div class="flex items-center flex-wrap justify-center md:justify-between gap-2 h-full min-h-[20rem]">
            <template v-for="(item, idx) in dataWeather?.list" :key="idx">
              <template v-if="idx === 0">
                <div class="bg-blue-500/10 rounded-md flex flex-col w-full md:w-auto py-1 px-6 items-center">
                  <img
                    v-if="item?.weather[0]?.icon"
                    class="mb-3"
                    :src="`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`"
                    alt="icon"
                  />
                  <h4 class="mb-4">
                    {{ item?.main?.temp }}
                    <sup>°</sup>
                    <span>C</span>
                  </h4>
                  <div class="mb-4 flex flex-col items-center">
                    <strong>{{ weekdayNames(item?.dt_txt) }}</strong>
                    <strong>{{ dataWeather?.city?.name }}</strong>
                  </div>

                  <span>Humidity: {{ item?.main.humidity }}%</span>
                  <span class="mb-3">Wind: {{ item?.wind?.speed }} kph </span>
                </div>
              </template>
              <template v-else>
                <div class="flex flex-col items-center">
                  <span class="mb-2">{{ weekdayNames(item?.dt_txt) }}</span>
                  <strong class="mb-2">{{ dateTime(item?.dt_txt, "HH:mm") }}</strong>

                  <img
                    v-if="item?.weather[0]?.icon"
                    class="mb-3"
                    :src="`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`"
                    alt="icon"
                  />

                  <h5 class="mb-6">
                    {{ item?.main?.temp }}
                    <sup>°</sup>
                    <span>C</span>
                  </h5>

                  <span>{{ item?.main.humidity }}%</span>
                  <span>{{ item?.wind?.speed }} kph </span>
                </div>
              </template>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </template>
  <template v-else>
    <el-skeleton :rows="3" animated />
    <el-skeleton-item variant="text" style="width: 30%" />
    <el-skeleton-item variant="text" style="width: 80%; margin-right: 16px" />
    <el-skeleton-item variant="text" style="margin-right: 16px" />
  </template>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";
import useFetchWeather from "@/hooks/api/useFetchWeather";
import { dateTime, weekdayNames } from "@/utils/formatDateTime";

import { DATA_WEATHER } from "@/db";

const { fetchDataWeather, response, isLoading } = useFetchWeather();
const dataWeather = computed(() => response.value || DATA_WEATHER);

onBeforeMount(async () => {
  await fetchDataWeather();
});
</script>
