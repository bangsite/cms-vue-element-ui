<template>
  <el-card class="rounded-md">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Upcoming Events</h4>
        <div class="flex items-center">
          <el-button
            class="rounded-md"
            :type="eventTab === 'today' ? 'primary' : ''"
            @click="handleTabActivation('today')"
            plain
          >
            Today
          </el-button>
          <el-button
            class="rounded-md"
            :type="eventTab === 'week' ? 'primary' : ''"
            @click="handleTabActivation('week')"
            plain
          >
            Week
          </el-button>

          <el-button
            class="rounded-md"
            :type="eventTab === 'month' ? 'primary' : ''"
            @click="handleTabActivation('month')"
            plain
          >
            Month
          </el-button>
        </div>
      </div>
    </template>

    <TableList
      ref="tableEvents"
      :border="false"
      :columns="eventColumns"
      :data-tables="eventData"
      :customCols="['event', 'actions']"
    >
      <!-- event -->
      <template #event="scope">
        <div class="flex items-center gap-2">
          <div
            class="flex flex-col items-center justify-center w-[72px] h-[72px] rounded-md min-w-[72px]"
            :class="`bg-${scope.row.type}`"
          >
            <span class="text-[12px]">{{ scope.row.date }}</span>
            <span class="text-[13px] font-medium">{{ scope.row.month }}</span>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-base font-medium break-words line-clamp-1">{{ scope.row.title }}</span>
            <span class="text-[14px] text-gray-500">{{ scope.row.time }}</span>
          </div>
        </div>
      </template>

      <!-- actions -->
      <template #actions="scope">
        <div class="flex justify-end">
          <el-button name="edit" size="small" type="primary" @click="handleEdit(scope.row)" link>
            <SvgIcon :icon="'akar-icons:edit'" :size="20"></SvgIcon>
          </el-button>
          <el-button name="delete" @click="handleDelete(scope.row)" size="small" type="danger" link>
            <SvgIcon :icon="'ic:round-close'" :size="20"></SvgIcon>
          </el-button>
        </div>
      </template>
      <!-- operation -->
    </TableList>
  </el-card>

  <!-- Modal-->
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import TableList from "@/components/tables/TableList.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

import { UP_EVENT_COLUMNS } from "@/enums/upEventColumns.enum";
import { DATA_EVENTS } from "@/db";

const eventColumns: any = computed(() => UP_EVENT_COLUMNS);
const eventData = computed(() => DATA_EVENTS[eventTab.value]);

const eventTab = ref("today");
const isLoading = ref(false);

const handleTabActivation = (value: string) => {
  isLoading.value = true;
  eventTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};

// const showModal = (id: any, item: any) => {};
const handleEdit = (value: any) => {
  console.log(value);
};
const handleDelete = (id: any) => {
  console.log(id);
};

const handleCancel = () => {};

const handleUpdate = (value: any) => {
  console.log(value);
};
</script>
