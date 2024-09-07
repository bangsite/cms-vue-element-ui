<template>
  <el-form ref="formSection" :labelPosition="'top'" v-if="data">
    <InputBase
      type="text"
      :name="`section_${sectionIndex}.block_${blockIndex}.id`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_ID')"
      :label="$t('BLOCK.BLOCK_ID')"
      rules="number_text_latin_lowercase|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />
    <InputBase
      type="text"
      :name="`section_${sectionIndex}.block_${blockIndex}.[${data.idx}].class`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_CLASS')"
      :label="$t('BLOCK.BLOCK_CLASS')"
      rules="block_class|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />

    <InputBase
      type="text"
      :name="`section_${sectionIndex}.block_${blockIndex}.background_color`"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_COLOR')"
      :label="$t('BLOCK.BLOCK_BG_COLOR')"
      rules="color_codes"
      :rulesAttrMessage="{ max: 9 }"
    />

    <EditorTinyMCE
      type="text"
      :name="`section_${data.sectionIndex}.block_${data.blockIndex}.html`"
      :disabled="disabled"
      :label="$t('BLOCK.BLOCK_HTML_EDITOR')"
      :note="$t('BLOCK.NOTE_EDITOR_HTML')"
      rules="max_editor_html:5000"
      :rulesAttrMessage="{ max: 5000 }"
      class="block__item-editor"
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

import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
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
