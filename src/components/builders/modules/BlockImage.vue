<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import InputBase from "@/components/form/InputBase.vue";

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

const handleModalImages = (url: string, position: number) => {
  console.log("url:::", url);
  console.log("position:::", position);
};
</script>

<template>
  <el-card class="block__card">
    <template #header>
      <el-row :gutter="10" justify="space-between" align="middle">
        <span>{{ title }}</span>
        <el-row :gutter="5" justify="space-between" align="middle">
          <el-button v-if="Number(currentIndex) !== 0" @click="handleMoveBlockItem('up', Number(currentIndex))">
            <SvgIcon :icon="'solar:arrow-up-outline'" :size="20" />
          </el-button>

          <el-button
            v-if="data.length !== Number(currentIndex) + 1"
            @click="handleMoveBlockItem('down', +Number(currentIndex))"
          >
            <SvgIcon :icon="'solar:arrow-down-outline'" :size="20" />
          </el-button>

          <el-button @click="handleRemoveBlockItem(Number(currentIndex))">
            <SvgIcon :icon="'ic:round-close'" :size="20" />
          </el-button>
        </el-row>
      </el-row>
    </template>
    <el-row :gutter="15" align="top">
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
        <el-row :gutter="15" align="middle">
          <el-col :span="18">
            <InputBase
              :name="`${label}[${Number(currentIndex)}].url`"
              type="text"
              :disabled="disabled"
              :placeholder="$t('BLOCK.PLH_IMAGE_URL')"
              :label="$t('BLOCK.BLOCK_IMG_URL')"
              class="block__item-image"
              rules="required|max:1000|url"
              :rulesAttrMessage="{ max: 1000 }"
            />
          </el-col>
          <el-col :span="6">
            <InputBase
              :name="`${label}[${Number(currentIndex)}].image_id`"
              type="file"
              :disabled="disabled"
              :label="$t('BLOCK.BTN_CHOOSE_FILE')"
              class="block__item-image"
            />
          </el-col>
        </el-row>
        <InputBase
          :name="`${label}[${Number(currentIndex)}].alt`"
          type="text"
          :disabled="disabled"
          :placeholder="$t('BLOCK.PLH_ALT')"
          :label="$t('BLOCK.BLOCK_IMG_ALT')"
          rules="max:100|special_characters"
          :rulesAttrMessage="{ max: 100 }"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped></style>
