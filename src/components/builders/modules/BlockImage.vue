<template>
  <el-form ref="formSection" :labelPosition="'top'" v-if="data">
    <InputBase
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.id`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_ID')"
      :label="$t('BLOCK.BLOCK_ID')"
      rules="number_text_latin_lowercase|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />
    <InputBase
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.class`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_CLASS')"
      :label="$t('BLOCK.BLOCK_CLASS')"
      rules="block_class|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />

    <InputBase
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.background_color`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_COLOR')"
      :label="$t('BLOCK.BLOCK_BG_COLOR')"
      rules="color_codes"
      :rulesAttrMessage="{ max: 9 }"
    />

    <InputBase
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.url`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_IMAGE_URL')"
      :label="$t('BLOCK.BLOCK_IMG_URL')"
      class="block__item-image"
      rules="required|max:1000|url"
      :rulesAttrMessage="{ max: 1000 }"
    />
    <InputBase
      type="file"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.image_id`"
      :disabled="disabled"
      :label="$t('BLOCK.BTN_CHOOSE_FILE')"
    />
    <InputBase
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.alt`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_ALT')"
      :label="$t('BLOCK.BLOCK_IMG_ALT')"
      rules="max:100|special_characters"
      :rulesAttrMessage="{ max: 100 }"
    />

    <!-- Actions -->
    <el-divider border-style="dashed" />
    <el-row justify="end" class="mt-4">
      <el-button @click="onCancel"> Cancel</el-button>
      <el-button :disabled="Object.keys(errors).length > 0 || isSubmitting" type="primary" @click="onSubmit">
        Submit
      </el-button>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";

import InputBase from "@/components/form/InputBase.vue";
import { useDialogStore } from "@/stores/dialog.store";

defineProps({
  label: { type: [String] },
  title: { type: [String] },
  sectionIndex: Number,
  blockIndex: Number,
  disabled: { type: Boolean, default: false },
});

const { setActive } = useDialogStore();
const { data } = storeToRefs(useDialogStore());
const { handleSubmit, setErrors, errors, isSubmitting, values } = useForm({ initialValues: {} });

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const onCancel = () => {
  setActive(false);
};
</script>

<style scoped></style>
