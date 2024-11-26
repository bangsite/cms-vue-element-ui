<template>
  <div class="bg-transparent hover:bg-gray-100 cursor-pointer flex items-center justify-center w-9 h-9 rounded-full">
    <el-popover
      ref="popoverRef"
      trigger="click"
      placement="bottom-end"
      :open="hovered"
      :width="'auto'"
      @click="handlePopover"
    >
      <template #reference>
        <div class="cursor-pointer flex flex-center relative shake" @click="handlePopover">
          <SvgIcon :icon="'clarity:notification-line'" :size="20" />
          <el-badge is-dot :max="99" class="absolute text-sm -top-0.5 -right-0.5" />
        </div>
      </template>
      <template #default>
        <el-tabs v-model="currentTab" class="flex flex-col min-w-[24rem] w-full rounded-md" @tab-click="handleTabClick">
          <el-tab-pane
            v-for="(notify, index) in notifyDataMessage"
            :key="notify.key"
            :label="`${capitalizeFirstLetter(notify.name)}(${notify.list.length})`"
            :name="index"
          >
            <div class="flex items-center gap-2 w-full mb-1" v-for="item in notify.list" :key="item.id">
              <SvgIcon v-if="item?.icon" :icon="item.icon" :size="20" />

              <div class="flex flex-col flex-grow">
                <span class="text-sm">{{ truncateString(item?.title, 50) }}</span>
                <span class="text-[12px] text-gray-400">{{ truncateString(item?.description, 60) }}</span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { DATA_MESSAGE_TAB } from "@/db";
import { truncateString, capitalizeFirstLetter } from "@/utils";

const hovered = ref<boolean>(false);
const currentTab = ref(0);
const popoverRef = ref();

const notifyDataMessage = computed(() => [...DATA_MESSAGE_TAB]);

const handlePopover = () => {
  currentTab.value = 0;
};

const handleTabClick = () => {};
</script>
