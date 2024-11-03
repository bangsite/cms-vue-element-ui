<template>
  <div>
    <table class="border border-solid border-[#F1F2F6]" width="100%">
      <thead class="bg-gray-100">
        <tr>
          <th colspan="2">
            <p>{{ dayjs(defaultValue).format("dddd") }}</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(time, key) in DATA_TIME_12H" :key="key + 1">
          <td class="text-sm" style="width: 66px">{{ time }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { DATA_TIME_12H } from "@/db";

const defaultValue = ref(dayjs().format("YYYY-MM-DD"));
const currentDate = ref(new Date());
const currentMonth = ref(parseInt(dayjs().format("M")));
const currentYear = ref(new Date().getFullYear());
const currentLabel = ref(dayjs(`${currentMonth.value}-12-${currentYear.value}`).format("MMMM YYYY"));

const setMonth = (month) => {
  currentMonth.value = month;
  currentLabel.value = dayjs(`${currentMonth.value}-12-${currentMonth.value}`).format("MMMM YYYY");
};
</script>

<style scoped lang="scss">
table {
  border-collapse: collapse;
}

table tr td {
  &:first-child {
    padding: 12px;
    width: 60px;
  }

  padding: 12px 0;
  border-bottom: 1px solid #f1f2f6;
}
</style>
