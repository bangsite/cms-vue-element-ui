<template>
  <el-card class="rounded-lg">
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

    <TableList
      ref="tableBestSellers"
      :columns="bestsellerColumns"
      :border="false"
      :data-tables="bestSellerData"
      :custom-cols="['name']"
      :custom-class="'table-best-seller'"
    >
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
    </TableList>
  </el-card>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import TableList from "@/components/tables/TableList.vue";

import { DATA_BEST_SELLER } from "@/db/dataBestSellers";
import { BEST_SELLER_COLUMNS } from "@/enums/bestSellerColumns.enum";

const sellerTab = ref("today");
const isLoading = ref(false);

const bestsellerColumns = computed(() => BEST_SELLER_COLUMNS);
const bestSellerData = computed(
  ()
);

const handleTabActivation = (value: string) => {
  isLoading.value = true;
  sellerTab.value = value;
  setTimeout(() => (isLoading.value = false), 2000);
};
</script>
