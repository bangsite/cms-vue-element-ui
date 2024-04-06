<template>
  <div class="block__type">
    <div class="block__type-item" v-for="(item, idx) in blockTypes" :key="idx" @click="addBlockForm(item?.type)">
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
import { BLOCK_FORM, BLOCK_TYPES } from "@/config/enums/builderLayout.enum";
import { storeToRefs } from "pinia";

const blockTitle = reactive({
  button: "BLOCK.BLOCK_BUTTON",
  image: "BLOCK.BLOCK_IMAGE",
  html: "BLOCK.BLOCK_HTML",
});

const { t } = useI18n();
const { setActive } = useDialogStore();
const { setBlockTypes, setBlockTypeSelected } = useBuilderLayoutStore();
const { blockTypes, sectionName } = storeToRefs(useBuilderLayoutStore());

const blockData = ref({});

onBeforeMount(() => {
  initBlockTypes();
});

const initBlockTypes = (page: string = "") => {
  const data = page ? BLOCK_TYPES.get(page) : BLOCK_TYPES.get("default");
  if (data && data.length) setBlockTypes(data as []);
};

const addBlockForm = (type: string) => {
  const data = type ? BLOCK_FORM.get(type) : BLOCK_FORM.get("default");

  if (data) {
    blockData.value = { ...data };
    blockData.value.block_title = t(blockTitle[type]);
    blockData.value.block_type = formatTypeName(type) || "";
    blockData.value.section_name = sectionName.value;

    setBlockTypeSelected({
      ...blockData.value,
    });
  }

  setActive(false);
};

const formatTypeName = (type: string) => {
  if (type === "button") return "BlockButton";
  else if (type === "image") return "BlockImage";
  else return "BlockHtml";
};
</script>
