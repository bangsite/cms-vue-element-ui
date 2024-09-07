<template>
  <div>
    <el-button type="primary" class="mb-4">Create New Event</el-button>

    <el-row :gutter="20">
      <el-col :xl="6" :lg="8" :xs="24">
        <el-calendar ref="calendar" class="mb-4 rounded-md">
          <template #header="">
            <el-button-group class="flex justify-center w-full">
              <el-button @click="selectDate('prev-month')"> Previous Month</el-button>
              <el-button @click="selectDate('today')">Today</el-button>
              <el-button @click="selectDate('next-month')"> Next Month</el-button>
            </el-button-group>
          </template>
        </el-calendar>
        <el-card class="rounded-md mb-4">
          <h3 class="title">My Calendar</h3>
          <ul class="event-list">
            <li v-for="{ id, title, label } in dataEvent" :key="id">
              <el-link to="#">
                <span :class="`bullet ${label}`" />
                {{ title }}
              </el-link>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :xl="18" :lg="16" :xs="24">
        <el-card class="rounded-md">
          <div class="flex items-center justify-between gap-2">
            <h3 class="title">My ElCalendar</h3>
            <div class="mb-4">
              <el-button type="primary"> Day</el-button>
              <el-button> Week</el-button>
              <el-button> Month</el-button>
              <el-button> Year</el-button>
            </div>
          </div>
          <component :is="tabs[currentTab]" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { CalendarDateType, CalendarInstance } from "element-plus";
import Day from "@/components/calendar/Day.vue";

const calendar = ref<CalendarInstance>();
const dataEvent = reactive([
  { id: 1, title: "Family Events", label: "event" },
  { id: 1, title: " Team Meeting", label: "event" },
  { id: 1, title: "UI/UX Tasks", label: "task" },
  { id: 1, title: "Project Update", label: "reminder" },
]);

const tabs = { Day };

const currentTab = ref<keyof typeof tabs>("Day");

const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};
</script>

<style scoped>
.el-calendar {
  --el-calendar-cell-width: 65px;
}
</style>
