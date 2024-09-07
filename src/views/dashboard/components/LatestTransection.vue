<template>
  <el-card class="rounded-md">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Latest Transections</h4>
        <div class="flex items-center">
          <el-button
            class="rounded-md"
            :type="transectionTab === 'today' ? 'primary' : ''"
            @click="handleTabActivation('today')"
            plain
          >
            Today
          </el-button>
          <el-button
            class="rounded-md"
            :type="transectionTab === 'week' ? 'primary' : ''"
            @click="handleTabActivation('week')"
            plain
          >
            Week
          </el-button>

          <el-button
            class="rounded-md"
            :type="transectionTab === 'month' ? 'primary' : ''"
            @click="handleTabActivation('month')"
            plain
          >
            Month
          </el-button>
        </div>
      </div>
    </template>
    <TableList
      ref="tableTransection"
      :border="false"
      :columns="transectionColumns"
      :data-tables="transectionData"
      :customCols="['info', 'credit']"
    >
      <!-- expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- info -->
      <template #info="scope">
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center w-[55px] h-[55px] rounded-md" :class="`bg-${scope.row.style}`">
            <SvgIcon :icon="`${scope.row.icon}`" :size="24" />
          </div>

          <div class="flex flex-col">
            <strong>{{ scope.row?.paymentMethod }}</strong>
            <span>{{ scope.row?.duration }}</span>
          </div>
        </div>
      </template>
      <!-- credit -->
      <template #amount="scope">
        <template v-if="scope.row?.paymentType === 'credit'">
          <span class="test-success">+{{ scope.row.amount }}</span>
        </template>
        <template v-else>
          <span class="text-danger">-{{ scope.row.amount }}</span>
        </template>
      </template>
      <!-- operation -->
    </TableList>
  </el-card>
</template>
<script setup lang="tsx">
import { computed, ref } from "vue";

import SvgIcon from "@/components/common/SvgIcon.vue";
import TableList from "@/components/tables/TableList.vue";

import { TRANSACTION_COLUMNS } from "@/enums/transactionsColumns.enum";
import { DATA_TRANSACTION } from "@/db";

const transectionTab = ref("today");
const isLoading = ref(false);

const transectionColumns: any = computed(() => TRANSACTION_COLUMNS);

const transectionData: any = computed(() => {
  return DATA_TRANSACTION && DATA_TRANSACTION[transectionTab.value].length > 0
    ? DATA_TRANSACTION[transectionTab.value]
    : [];
});
const handleTabActivation = (value: string) => {
  isLoading.value = true;
  transectionTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};
</script>
