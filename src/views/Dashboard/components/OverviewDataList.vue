<template>
  <el-row :gutter="20">
    <el-col v-for="(item, i) in OverviewDataSorted" :lg="12" :md="12" :sm="12" :xs="24" :key="i" class="mb-[20px]">
      <Suspense>
        <template #default>
          <OverviewCard :ocData="item" />
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

<script>
import { defineComponent } from "vue";
import OverviewCard from "@/components/cards/OverviewCard.vue";
import OverviewData from "@/db/overviewCard.json";

const OverviewDataList = defineComponent({
  name: "OverviewDataList",
  components: {
    OverviewCard,
    //OverviewDataStyleWrap,
  },
  setup() {
    const OverviewDataSorted = OverviewData.slice(0, 4);
    return {
      OverviewDataSorted,
    };
  },
});
export default OverviewDataList;
</script>
