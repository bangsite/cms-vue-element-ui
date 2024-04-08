<template>
  <el-form ref="formSection" :labelPosition="'top'" class="container mx-auto max-w-[75%]">
    <el-collapse
      v-model="activeKey"
      v-for="(item, idx) in Object.keys(SECTION_FIELD)"
      :key="idx"
      class="el-card section mb-10"
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
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";

import { useBuilderLayout } from "@/hooks/web/useBuilderLayout";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import { SECTION_FIELD, SECTION_FORM } from "@/config/enums/builderLayout.enum";

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

onBeforeMount(() => {});
</script>

<style scoped></style>
