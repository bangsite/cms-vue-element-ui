<script setup lang="ts">
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import InputBase from "@/components/form/InputBase.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

defineProps({
  data: {
    type: [Object, Array],
  },
  label: {
    type: [String],
  },
  title: {
    type: [String],
  },
  currentIndex: {
    type: [Number, String],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["removeBlockItem", "moveBlockItem"]);

const handleMoveBlockItem = (move: string, position: number) => {
  console.log("move:::", move);
  console.log("position:::", position);
};
const handleRemoveBlockItem = (position: number) => {
  console.log("position:::", position);
};
</script>

<template>
  <el-card class="block__card">
    <template #header>
      <el-row :gutter="10" justify="space-between" align="middle">
        <span>{{ title }}</span>

        <el-row :gutter="10" justify="space-between" align="middle">
          <el-button
            v-if="Number(currentIndex) !== 0"
            @click="handleMoveBlockItem('up', +Number(currentIndex))"
            class="btn-up"
          >
            <SvgIcon :icon="'solar:arrow-up-outline'" :size="20" />
          </el-button>

          <el-button
            v-if="data.length !== Number(currentIndex) + 1"
            @click="handleMoveBlockItem('down', Number(currentIndex))"
            class="btn-down"
          >
            <SvgIcon :icon="'solar:arrow-down-outline'" :size="20" />
          </el-button>

          <el-button @click="handleRemoveBlockItem(Number(currentIndex))" class="btn-close block__btn-close">
            <SvgIcon :icon="'ic:round-close'" :size="20" />
          </el-button>
        </el-row>
      </el-row>
    </template>
    <el-row :gutter="10">
      <el-col :span="12">
        <InputBase
          :name="`${label}[${Number(currentIndex)}].id`"
          type="text"
          :disabled="disabled"
          :placeholder="$t('BLOCK.PLH_ID')"
          :label="$t('BLOCK.BLOCK_ID')"
          rules="number_text_latin_lowercase|max:250"
          :rulesAttrMessage="{ max: 250 }"
        />
        <InputBase
          :name="`${label}[${Number(currentIndex)}].class`"
          type="text"
          :disabled="disabled"
          :placeholder="$t('BLOCK.PLH_CLASS')"
          :label="$t('BLOCK.BLOCK_CLASS')"
          rules="block_class|max:250"
          :rulesAttrMessage="{ max: 250 }"
        />

        <InputBase
          :name="`${label}[${Number(currentIndex)}].background_color`"
          type="text"
          :disabled="disabled"
          :placeholder="$t('BLOCK.PLH_COLOR')"
          :label="$t('BLOCK.BLOCK_BACKGROUND_COLOR')"
          rules="color_codes"
          :rulesAttrMessage="{ max: 9 }"
        />
      </el-col>
      <el-col :span="12">
        <EditorTinyMCE
          class="block__item-editor"
          :name="`${label}[${Number(currentIndex)}].html`"
          type="text"
          :disabled="disabled"
          :label="$t('BLOCK.BLOCK_EDITOR_HTML')"
          :note="$t('BLOCK.NOTE_EDITOR_HTML')"
          rules="max_editor_html:5000"
          :rulesAttrMessage="{ max: 5000 }"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped></style>
