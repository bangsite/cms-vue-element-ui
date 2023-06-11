<template>
  <div class="pb-15">
    <template v-for="item in options" :key="item.path">
      <div
        class="bg-#e5e7eb dark:bg-dark h-56px mt-8px px-14px rounded-4px cursor-pointer flex-y-center justify-between"
        :style="{
          background: item.path === active ? theme.themeColor : '',
          color: item.path === active ? '#fff' : '',
        }"
        @click="handleTo"
        @mouseenter="handleMouse(item)"
      >
        <SvgIcon :icon="item.meta.icon" :local-icon="item.meta?.localIcon" />
        <span class="flex-1 ml-5px">{{ item.meta?.title }}</span>
        <SvgIcon :icon="'ant-design:enter-outlined'" :size="24" />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useAppStore } from "@/core/stores/modules/app.store";

interface Props {
  value: string;
  options: AppRouteRecordRaw[];
}
interface Emits {
  (e: "update:value", val: string): void;
  (e: "enter"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// const appStore = useAppStore();

const theme = ref();
const active = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    emit("update:value", val);
  },
});

async function handleMouse(item: AppRouteRecordRaw) {
  active.value = item.path;
}

function handleTo() {
  emit("enter");
}
</script>
