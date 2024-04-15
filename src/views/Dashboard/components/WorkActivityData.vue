<template>
  <el-card shadow="hover" class="rounded-xl">
    <template #header>
      <div class="flex items-center justify-between cursor-pointer">
        <h4 class="title">Activity</h4>
        <a href="#">More news</a>
      </div>
    </template>

    <el-descriptions title="Activity">
      <el-descriptions-item v-for="item in WorkActivityData" :key="item.id">
        <el-row :gutter="15" justify="start" align="middle" class="mb-10">
          <el-col :span="2">
            <div class="bg-blue-500/10 flex items-center justify-center w-[64px] h-[64px] rounded-full">
              <SvgIcon :icon="'logos:mps-icon'" :size="24" />
            </div>
          </el-col>
          <el-col :span="22">
            <el-link href="#">{{ item.content }}</el-link>
          </el-col>
        </el-row>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { WorkActivity } from "@/data/workbench.data";
import SvgIcon from "@/components/common/SvgIcon.vue";

const WorkActivityData = computed(() => WorkActivity);
</script>

<style scoped lang="scss"></style>
