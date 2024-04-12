<template>
  <el-card class="rounded-xl">
    <template #header>
      <div class="flex flex-wrap gap-2 items-center justify-between cursor-pointer">
        <h4 class="title">Best Sellers</h4>
        <div class="flex items-center">
          <el-button
            class="rounded-md"
            :type="sellerTab === 'today' ? 'primary' : ''"
            @click="handleTabActivation('today')"
            plain
          >
            Today
          </el-button>
          <el-button
            class="rounded-md"
            :type="sellerTab === 'week' ? 'primary' : ''"
            @click="handleTabActivation('week')"
            plain
          >
            Week
          </el-button>

          <el-button
            class="rounded-md"
            :type="sellerTab === 'month' ? 'primary' : ''"
            @click="handleTabActivation('month')"
            plain
          >
            Month
          </el-button>
        </div>
      </div>
    </template>

    <TableBasic ref="tableBasic" :columns="bestsellerColumns" :data="bestSellerData" :customCols="['name']">
      <!-- expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>

      <!-- name -->
      <template #name="scope">
        <div class="flex items-center gap-1">
          <img :src="`src/assets/images/sellers/${scope.row.img}`" alt="Product" width="30" />
          <span>{{ scope.row.name }}</span>
        </div>
      </template>

      <!-- operation -->
    </TableBasic>
  </el-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import TableBasic from "@/components/tables/TableBasic.vue";

import TableData from "@/db/bestSellers.json";
import { BEST_SELLER_COLUMNS } from "@/enums/bestSellerColumns.enum";

const sellerTab = ref("today");
const isLoading = ref(false);

const bestsellerColumns = computed(() => BEST_SELLER_COLUMNS);
const bestSellerData = computed(() => TableData.bestSeller !== null && TableData.bestSeller[sellerTab.value]);

const handleTabActivation = (value: string) => {
  isLoading.value = true;
  sellerTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};
</script>
