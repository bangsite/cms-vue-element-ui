<template>
  <div class="block__type">
    <div class="block__type-item" v-for="(item, idx) in blockTypes" :key="idx" @click="mapBlockForm(item)">
      <SvgIcon :icon="item.icon" :size="24" class="block__type-icon" />
      <span class="block__type-name">{{ $t(item?.name) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { useDialogStore } from "@/stores/dialog.store";

import SvgIcon from "@/components/common/SvgIcon.vue";
import { BLOCK_TYPES } from "@/config/enums/builderLayout.enum";

import { storeToRefs } from "pinia";
import { Block, BlockFormMap } from "@/types/builderLayout";

// const blockTitle: Record<string, string> = reactive({
//   button: "BLOCK.BLOCK_BUTTON",
//   image: "BLOCK.BLOCK_IMAGE",
//   html: "BLOCK.BLOCK_HTML",
// });

// Define a type excluding the 'section_name' property
type BlockFormIntoSection = Omit<BlockFormMap, "section_name" | "block_title" | "block_type">;

const { t } = useI18n();
const { setActive } = useDialogStore();
const { setBlockTypes, addBlock } = useBuilderLayoutStore();
const { blockTypes, sectionName } = storeToRefs(useBuilderLayoutStore());

const selectedBlock = ref<BlockFormIntoSection | null>(null);

onBeforeMount(() => {
  initBlockTypes();
});

const initBlockTypes = (page: string = "") => {
  const data = page ? BLOCK_TYPES.get(page) : BLOCK_TYPES.get("default");
  debugger;
  if (data && data.length) setBlockTypes(data);
};

const mapBlockForm = (data: Block) => {
  if (!data) {
    console.error("Block form data not found");
    return;
  }

  selectedBlock.value = {
    ...data,
    block_title: t(data.title),
    block_type: data.type || "",
    section_name: sectionName.value,
  };

  addBlock({ ...selectedBlock.value });

  setActive(false);
};

// const formatTypeName = (type: string) => {
//   if (type === "button") return "BlockButton";
//   else if (type === "image") return "BlockImage";
//   else return "BlockHtml";
// };
</script>
