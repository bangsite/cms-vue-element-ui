<template>
  <el-row :gutter="20" class="overview-card">
    <el-col
      v-for="(item, i) in overviewCardSorted"
      :xl="6"
      :lg="6"
      :md="12"
      :sm="12"
      :xs="24"
      :key="i"
      class="mb-[20px]"
    >
      <Suspense>
        <template #default>
          <OverviewCard :data="item" />
        </template>
        <template #fallback>
          <el-card>
            <el-skeleton active />
          </el-card>
        </template>
      </Suspense>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { computed } from "vue";
import OverviewCard from "@/components/cards/OverviewCard.vue";
import { DATA_OVERVIEW_CARD } from "@/db";

const overviewCardSorted = computed(() => {
  return DATA_OVERVIEW_CARD && DATA_OVERVIEW_CARD.length > 0 ? DATA_OVERVIEW_CARD.slice(0, 4) : [];
});
</script>
