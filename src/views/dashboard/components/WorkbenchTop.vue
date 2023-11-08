<template xmlns="http://www.w3.org/1999/html">
  <el-skeleton :loading="isLoading" active>
    <el-card>
      <el-row :gutter="15" justify="start" align="middle">
        <el-col :span="24">
          <el-row justify="space-between" align="middle">
            <div class="flex flex-col">
              <img :src="currentWeather.condition.icon" alt="icon" :width="64" />
            </div>
            <div class="flex flex-col">
              <span style="font-size: 30px"> {{ currentWeather.temp_c }}<sup style="font-size: 20px">°C</sup> </span>
              <span>{{ currentWeather.condition.text }}</span>
            </div>
            |
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
            |
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
            |
            <div class="flex flex-col">
              <span>{{ locationWeather.name }}</span>
              <span>{{ dateFull(locationWeather.localtime) }}</span>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
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
