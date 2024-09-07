<template>
  <div class="flex flex-wrap justify-center items-center gap-2 px-4 pt-6 pb-12 overflow-hidden">
    <div
      class="block__type-item max-w-44 flex-1"
      v-for="(type, idx) in listBlockTypes"
      :key="idx"
      @click="type.status && handleAddBlock(type)"
      :class="!type.status ? 'hover:cursor-default hover:bg-gray-400 ' : ''"
    >
      <SvgIcon :icon="type.icon" :size="24" class="block__type-icon" />
      <span class="block__type-name">{{ $t(`BLOCK.${type.nameKey}`) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";

import SvgIcon from "@/components/common/SvgIcon.vue";
import useBuilderBlock from "@/hooks/useBuilderBlock";
import { showNotification } from "@/utils";
import { BlockType } from "@/types";

const props = defineProps({
  pageId: {
    type: String,
    default: "",
  },
  sectionId: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["closeModal", "blockAdded"]);

const { t } = useI18n();
const { listBlockTypes, dataBlockForm, mapBlockTypes } = useBuilderBlock();
const { addBlockToSection } = useBuilderLayoutStore();

const handleAddBlock = (type: BlockType) => {
  mapBlockTypes(type);

  if (dataBlockForm.value && props.pageId && props.sectionId) {
    addBlockToSection(props.pageId, props.sectionId, dataBlockForm.value);

    showNotification("Block added successfully!", "success");

    emit("blockAdded", { sectionId: props.sectionId, blockForm: dataBlockForm.value });
    emit("closeModal");
  }
};
</script>
