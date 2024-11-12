<template>
  <div class="flex align-center justify-between gap-1">
    <div>
      <el-button type="primary" :icon="Refresh" @click="handleRefresh">Refresh</el-button>
    </div>

    <SelectBase name="Sort by" placeholder="Sort by"></SelectBase>
  </div>
  <el-divider border-style="dashed" style="margin: 0 0 15px" />

  <div class="flex h-auto w-full">
    <template v-if="response && response.length > 0">
      <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5 w-full">
        <el-image
          v-for="images in response"
          :key="images.publicId"
          :src="images.thumbUrl"
          :fit="'cover'"
          lazy
          class="min-h-[280px] h-auto"
        >
          <template #error>
            <div class="image-slot flex items-center justify-center w-full h-full text-xl text-gray-500 bg-gray-200">
              <SvgIcon :icon="'circum:image-on'" :size="36" />
            </div>
          </template>
        </el-image>
      </div>
    </template>

    <template v-else>
      <div
        class="border border-gray-300 border-dashed gap-2 flex flex-col justify-center items-center flex-grow rounded-md min-h-[75vh] h-full w-full"
      >
        <el-empty description="No data" />
        <LoadingCustom />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { Refresh } from "@element-plus/icons-vue";

import SvgIcon from "@/components/common/SvgIcon.vue";
import SelectBase from "@/components/form/SelectBase.vue";

import useMedia from "@/hooks/api/useMedia";
import LoadingCustom from "@/components/common/LoadingCustom.vue";

const { getListImage, response } = useMedia();

onBeforeMount(async () => {
  await getListImage();
});

const handleRefresh = async () => {
  await getListImage();
};
</script>

<style scoped></style>
