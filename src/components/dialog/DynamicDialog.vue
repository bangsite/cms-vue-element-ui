<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    align-center
    @close="handleClose"
    destroy-on-close
    class="w-[85%] md:w-[60%] lg:w-[40%] overflow-auto max-h-[95vh] rounded-md"
  >
    <template #header="{ titleClass }">
      <span :class="titleClass">{{ title }}</span>
    </template>
    <component :is="layout" />

    <template #footer>
      <span class="dialog-footer" v-if="activeFooter">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Save</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { type Component, computed, defineAsyncComponent } from "vue";
import { useDialogStore } from "@/stores/dialog.store";

const DYNAMIC_LAYOUT: Record<string, Component> = {
  button: defineAsyncComponent(() => import("@/components/builders/modules/BlockButton.vue")),
  image: defineAsyncComponent(() => import("@/components/builders/modules/BlockImage.vue")),
  html: defineAsyncComponent(() => import("@/components/builders/modules/BlockHtml.vue")),
};

const { title, active, activeFooter, layoutName, setActive } = useDialogStore();
const dialogVisible = computed(() => active);

const layout = computed(() => DYNAMIC_LAYOUT[layoutName]);

const handleClose = () => setActive(false);
</script>

<style scoped></style>
