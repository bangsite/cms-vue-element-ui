<template>
  <el-form ref="formSection" :labelPosition="'top'">
    <el-collapse
      v-model="activeKey"
      v-for="(item, idx) in Object.keys(SECTION_FIELD)"
      :key="idx"
      class="el-card section mb-10"
      @change="handleChange"
    >
      <el-collapse-item :name="idx" class="el-card__body">
        <template #title>
          <h4>{{ `Section  ${idx + 1}` }}</h4>
        </template>

        <RenderBlock
          v-if="activeKey && activeKey.length"
          :label="item"
          :disabled="true"
          :data="
            item === 'section_1'
              ? fieldsS1
              : item === 'section_2'
              ? fieldsS2
              : item === 'section_3'
              ? fieldsS3
              : fieldsS4
          "
        />
        <!-- Add Block -->
        <el-button v-if="activeKey" @click="addBlockTypes(idx + 1, item)" class="btn-add-block" plain>
          <SvgIcon :icon="'ion:add-circle-outline'" :size="20" />
        </el-button>
      </el-collapse-item>
    </el-collapse>

    <!-- Actions -->
    <el-row justify="end" class="mt-20">
      <el-button :disabled="Object.keys(errors).length > 0 || isSubmitting" type="primary" @click="onSubmit">
        Submit
      </el-button>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, watch } from "vue";
import { useFieldArray, useForm } from "vee-validate";
import { storeToRefs } from "pinia";

import { useBuilderLayout } from "@/composables/useBuilderLayout";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { SECTION_FIELD, SECTION_FORM } from "@/core/enums/builderLayout.enum";

const RenderBlock = defineAsyncComponent(() => import("@/components/builders/RenderBlock.vue"));
const SvgIcon = defineAsyncComponent(() => import("@/components/common/SvgIcon.vue"));

const activeKey = ref([""]);

const { addBlockTypes } = useBuilderLayout();
const { sectionName, blockTypeSelected } = storeToRefs(useBuilderLayoutStore());

const { handleSubmit, setValues, setFieldValue, setErrors, errors, isSubmitting, values } = useForm({
  initialValues: {
    ...SECTION_FORM,
  },
});

const { remove: removeS1, push: pushS1, fields: fieldsS1, move: moveS1 } = useFieldArray("section_1");
const { remove: removeS2, push: pushS2, fields: fieldsS2, move: moveS2 } = useFieldArray("section_2");
const { remove: removeS3, push: pushS3, fields: fieldsS3, move: moveS3 } = useFieldArray("section_3");
const { remove: removeS4, push: pushS4, fields: fieldsS4, move: moveS4 } = useFieldArray("section_4");

onBeforeMount(() => {});

const handleChange = (val: string[]) => {
  activeKey.value = val;
};

const pushBlockToForm = (sectionName: string) => {
  if (sectionName === "section_1") pushS1(blockTypeSelected.value);
  if (sectionName === "section_2") pushS2(blockTypeSelected.value);
  if (sectionName === "section_3") pushS3(blockTypeSelected.value);
  if (sectionName === "section_4") pushS4(blockTypeSelected.value);
};

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

watch(blockTypeSelected, () => pushBlockToForm(sectionName.value));
</script>

<style scoped></style>
