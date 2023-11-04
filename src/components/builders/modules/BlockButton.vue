<script setup lang="ts">
import InputBase from "@/components/form/InputBase.vue";
import { useDialogStore } from "@/stores/dialog.store";
import { storeToRefs } from "pinia";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { useForm } from "vee-validate";

defineProps({
  // data: {
  //   type: [Object, Array],
  // },
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

const { sectionName } = storeToRefs(useBuilderLayoutStore());
const { setActive } = useDialogStore();
const { data } = storeToRefs(useDialogStore());
const { key, value } = data.value;
console.log(key);
console.log(value);
const { handleSubmit, setValues, setFieldValue, setErrors, errors, isSubmitting, values } = useForm({
  initialValues: {},
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const onCancel = () => {
  setActive(false);
};
</script>

<template>
  <el-form ref="formSection" :labelPosition="'top'" v-if="data">
    <InputBase
      :name="`${sectionName}[${key}].id`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_ID')"
      :label="$t('BLOCK.BLOCK_ID')"
      rules="number_text_latin_lowercase|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />
    <InputBase
      :name="`${sectionName}[${key}].class`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_CLASS')"
      :label="$t('BLOCK.BLOCK_CLASS')"
      rules="block_class|max:250"
      :rulesAttrMessage="{ max: 250 }"
    />
    <InputBase
      :name="`${sectionName}[${key}].background_color`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_COLOR')"
      :label="$t('BLOCK.BLOCK_BACKGROUND_COLOR')"
      rules="color_codes"
      :rulesAttrMessage="{ max: 9 }"
    />

    <InputBase
      :name="`${sectionName}[${key}].label`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_LABEL')"
      :label="$t('BLOCK.BLOCK_BUTTON_LABEL')"
      rules="required|max:100|special_characters"
      :rulesAttrMessage="{ max: 100 }"
    />

    <InputBase
      :name="`${sectionName}[${key}].button_color`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_COLOR')"
      :label="$t('BLOCK.BLOCK_BUTTON_COLOR')"
      rules="color_codes"
      :rulesAttrMessage="{ max: 9 }"
    />
    <InputBase
      :name="`${sectionName}[${key}].url`"
      type="text"
      :disabled="disabled"
      :placeholder="$t('BLOCK.PLH_URL')"
      :label="$t('BLOCK.BLOCK_BUTTON_URL')"
      rules="required|max:1000"
      :rulesAttrMessage="{ max: 1000 }"
    />
    <!-- Actions -->
    <el-divider border-style="dashed" />
    <el-row justify="end" class="mt-20">
      <el-button @click="onCancel"> Cancel </el-button>
      <el-button :disabled="Object.keys(errors).length > 0 || isSubmitting" type="primary" @click="onSubmit">
        Submit
      </el-button>
    </el-row>
  </el-form>
</template>

<style scoped></style>
