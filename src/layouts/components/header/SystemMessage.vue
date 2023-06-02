<template>
  <ElPopover trigger="click" placement="bottom">
    <template #reference>
      <div class="notify w-50 h-full flex flex-center" @mouseover="(e) => (buttonRef = e.currentTarget)">
        <SvgIcon :icon="'clarity:notification-line'" :size="20" />
        <ElBadge :value="count" :max="99" :class="[count < 10 ? '-right-2px' : '-right-10px']" class="notify__badge" />
      </div>

      <ElTooltip
        ref="tooltipRef"
        :visible="true"
        placement="bottom"
        effect="dark"
        :virtual-ref="buttonRef"
        virtual-triggering
        popper-class="singleton-tooltip"
      >
        <template #content>
          <span>System message</span>
        </template>
        <!--        <div class="notify w-50 h-full flex flex-center">-->
        <!--          <SvgIcon :icon="'clarity:notification-line'" :size="20" />-->
        <!--          <ElBadge-->
        <!--            :value="count"-->
        <!--            :max="99"-->
        <!--            :class="[count < 10 ? '-right-2px' : '-right-10px']"-->
        <!--            class="notify__badge"-->
        <!--          />-->
        <!--        </div>-->
      </ElTooltip>
    </template>

    <el-tabs v-model:value="currentTab" class="demo-tabs" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item, index) in tabData" :key="item.key" :name="index">
        <span class="mr-5">{{ item.name }}</span>
        <ElBadge
          v-bind="item.badgeProps"
          :value="item.list.filter((message) => !message.isRead).length"
          :max="99"
          show-zero
        />
      </el-tab-pane>
    </el-tabs>
  </ElPopover>
</template>
<script setup lang="ts">
import { computed, ref, unref } from "vue";

import SvgIcon from "@/components/SvgIcon.vue";
import { MessageData } from "@/data/message.data";
import type { MessageTab } from "@/core/interfaces/notify-message.interface";

const tabData = ref<MessageTab[]>([...MessageData]);
const buttonRef = ref();
const tooltipRef = ref();
const currentTab = ref(0);

const count = computed(() => {
  return tabData.value.reduce((acc, cur) => {
    return acc + cur.list.filter((item) => !item.isRead).length;
  }, 0);
});

const handleTabClick = (e) => {
  console.log(e);
};
</script>
