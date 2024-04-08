<template>
  <el-dialog v-model="dialogVisible" :title="title" align-center @close="handleClose" destroy-on-close>
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
import { computed, defineAsyncComponent } from "vue";
import { useDialogStore } from "@/stores/dialog.store";

const BlockTypes = defineAsyncComponent(() => import("@/components/builders/BlockTypes.vue"));
const BlockButton = defineAsyncComponent(() => import("@/components/builders/modules/BlockButton.vue"));
const BlockImage = defineAsyncComponent(() => import("@/components/builders/modules/BlockImage.vue"));
const BlockHtml = defineAsyncComponent(() => import("@/components/builders/modules/BlockHtml.vue"));

const DYNAMIC_LAYOUT = {
  BlockTypes,
  BlockButton,
  BlockImage,
  BlockHtml,
};

const { title, active, activeFooter, layoutName, setActive } = useDialogStore();
const dialogVisible = computed(() => active);

const layout = computed(() => DYNAMIC_LAYOUT[layoutName]);

const handleClose = () => setActive(false);
</script>

<style scoped></style>
