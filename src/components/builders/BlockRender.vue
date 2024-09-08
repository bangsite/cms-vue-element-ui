<template>
  <TransitionGroup name="slide" tag="div">
    <el-card shadow="hover" v-for="(block, idx) in data.blocks" :key="idx" class="block mb-4 rounded-md">
      <div class="flex items-center w-full">
        <div class="flex items-center gap-1 flex-1">
          <!--btn drag-->
          <el-button type="primary" @click="dragBlock(idx)" class="btn-up" link>
            <SvgIcon :icon="'carbon:drag-vertical'" :size="24" />
          </el-button>
          <h6>{{ block.title + " " + idx }}</h6>
        </div>

        <div class="flex items-center justify-end gap-1 flex-1">
          <!--btn edit-->
          <el-button type="primary" @click="editBlock(block, idx)" class="btn-edit" link>
            <SvgIcon :icon="'circum:edit'" :size="24" />
          </el-button>

          <!--btn remove-->
          <el-button @click="handleRemoveBlock(data.id, idx)" class="btn-close" link type="danger">
            <SvgIcon :icon="'material-symbols:delete-outline'" :size="24" />
          </el-button>
        </div>
      </div>
    </el-card>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useDialogStore } from "@/stores/dialog.store";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import SvgIcon from "@/components/common/SvgIcon.vue";

import type { Section } from "@/types";

const props = defineProps({
  data: { type: [Object], required: true },
  pageId: { type: [String] },
  label: { type: [String] },
  sectionIndex: { type: [Number] },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["removedBlock"]);
const data = computed<Section>(() => {
  return props.data || { id: "", name: "", blocks: [] };
});
const { setTitle, setLayoutName, setActive, setDataRender } = useDialogStore();
const { removeBlock } = useBuilderLayoutStore();

const dragBlock = (index: number) => {
  console.log(index);
};
const editBlock = (data: Record<string, any>, index: number) => {
  if (data && Object.keys(data).length > 0) {
    const mapDataBlockFrom = { ...data, sectionIndex: props.sectionIndex, blockIndex: index };

    setActive(true);
    setTitle(`Edit ${data.title}`);
    setLayoutName(data.type);
    setDataRender(mapDataBlockFrom);
  }
};

const handleRemoveBlock = (sectionId: string, blockIdx: number) => {
  if (props.pageId && sectionId) {
    removeBlock(props.pageId, sectionId, blockIdx);
    emit("removedBlock", { sectionId: sectionId, blockIdx: blockIdx });
  }
};
</script>

<style scoped></style>
