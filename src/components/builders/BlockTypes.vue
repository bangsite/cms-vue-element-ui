<template>
  <div class="block__type">
    <div class="block__type-item" v-for="(item, idx) in blockTypes" :key="idx" @click="mapBlockForm(item)">
      <SvgIcon :icon="item.icon" :size="24" class="block__type-icon" />
      <span class="block__type-name">{{ $t(item?.name) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { useDialogStore } from "@/stores/dialog.store";

import SvgIcon from "@/components/common/SvgIcon.vue";
import { BLOCK_FORM, BLOCK_TYPES } from "@/enums/builderLayout.enum";

import { storeToRefs } from "pinia";
import { type BlockFormMap, type ExtendedBlockFormMap } from "@/types";

// const blockTitle: Record<string, string> = reactive({
//   button: "BLOCK.BLOCK_BUTTON",
//   image: "BLOCK.BLOCK_IMAGE",
//   html: "BLOCK.BLOCK_HTML",
// });

// Define a type excluding the 'section_name' property

const { t } = useI18n();
const { setActive } = useDialogStore();
const { setBlockTypes, addBlock } = useBuilderLayoutStore();
const { blockTypes, sections } = storeToRefs(useBuilderLayoutStore());

const selectedBlock = ref<ExtendedBlockFormMap>();

onBeforeMount(() => {
  initBlockTypes();
});

const initBlockTypes = (page: string = "") => {
  const data = page ? BLOCK_TYPES.get(page) : BLOCK_TYPES.get("default");
  if (data && data.length) setBlockTypes(data);
};

const mapBlockForm = (data: BlockFormMap) => {
  if (!data) {
    console.error("Block form data not found");
    return;
  }

  selectedBlock.value = {
    block_title: "name",
    block_type: "type",
    section_name: "section",
    ...data,
  } as ExtendedBlockFormMap;

  addBlock(0, { ...selectedBlock.value });

  setActive(false);
};

// const formatTypeName = (type: string) => {
//   if (type === "button") return "BlockButton";
//   else if (type === "image") return "BlockImage";
//   else return "BlockHtml";
// };
</script>
