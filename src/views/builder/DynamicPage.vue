<template>
  <div class="flex flex-col lg:flex-row gap-2 items-start">
    <div class="rounded-md w-full lg:w-9/12">
      <el-card class="rounded-md mb-4">
        <template #header>
          <h5 class="title">{{ pages[0].name }}</h5>
        </template>
        <el-form ref="formSection" :labelPosition="'top'" class="overflow-auto min-h-96 max-h-[80vh]">
          <el-collapse
            v-model="activeKey"
            v-for="(item, idx) in pages[0].sections"
            :key="item.id"
            class="section mb-4 rounded-md"
            @change="handleChange"
          >
            <el-collapse-item :name="idx" class="p-3">
              <template #title>
                <div class="flex items-center justify-between w-full">
                  <h6>{{ item.name + " " + idx }}</h6>
                  <el-button @click="handleRemoveSection(idx, $event)" link type="danger">
                    <SvgIcon :icon="'material-symbols:delete-outline'" :size="24" />
                  </el-button>
                </div>
              </template>

              <BlockRender
                v-if="activeKey && activeKey.length"
                :disabled="true"
                :data="item"
                :pageId="pages[0].id"
                :sectionIndex="idx"
                @editBlock="handleBlockEdit"
                @removedBlock="handleBlockRemove"
              />

              <!-- Add Block -->
              <el-button v-if="activeKey" class="btn-add-block rounded-md" plain @click="handleBlockAdd(item)">
                <SvgIcon :icon="'mi:add'" :size="24" />
                Add Block
              </el-button>
            </el-collapse-item>
          </el-collapse>

          <!-- Add Section -->
          <el-button v-if="activeKey" @click="handleAddSection" class="btn-add-block" plain>
            <SvgIcon :icon="'mi:add'" :size="24" />
            Add Section
          </el-button>
        </el-form>
      </el-card>

      <DataJsonPretty :data="values" :showLine="true" />
    </div>

    <div class="rounded-md w-full lg:w-3/12">
      <Publish name="pushlish" />

      <Categories name="categories" />

      <Tags name="tags" />
    </div>
  </div>

  <ModalView
    v-if="isModalActive"
    :modalActive="isModalActive"
    :disable-footer="true"
    @close-modal="isModalActive = !isModalActive"
  >
    <template #header><h4>Block types</h4></template>
    <template #body>
      <component
        :is="BlockTypes"
        :pageId="pages[0].id"
        :sectionId="sectionId"
        @blockAdded="handleBlockAdded"
        @closeModal="isModalActive = !isModalActive"
      />
    </template>
  </ModalView>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { useFieldArray, useFieldValue, useForm } from "vee-validate";
import { storeToRefs } from "pinia";

import { useBuilderLayout } from "@/hooks/useBuilderLayout";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";

import ModalView from "@/components/modal/ModalView.vue";
import Categories from "@/components/common/Categories.vue";
import Tags from "@/components/common/Tags.vue";
import Publish from "@/components/common/Publish.vue";
import type { Page, Section } from "@/types";
import DataJsonPretty from "@/components/common/DataJsonPretty.vue";

const BlockRender = defineAsyncComponent(() => import("@/components/builders/BlockRender.vue"));
const BlockTypes = defineAsyncComponent(() => import("@/components/builders/BlockTypes.vue"));
const SvgIcon = defineAsyncComponent(() => import("@/components/common/SvgIcon.vue"));

const activeKey = ref([""]);
const isModalActive = ref(false);
const sectionId = ref("");

const { initPage, initSection } = useBuilderLayout();
const { addPage, addSectionToPage, removeSectionFromPage } = useBuilderLayoutStore();
const { pages } = storeToRefs(useBuilderLayoutStore());

const { handleSubmit, setErrors, errors, isSubmitting, values, setFieldValue } = useForm<Page>({
  initialValues: {
    ...initPage(),
  },
});
// Use FieldArray for sections in Vee-Validate
const { fields: sections, push: pushSection, remove: removeSection } = useFieldArray("sections");

onBeforeMount(() => {
  const newPage = initPage();
  addPage({ ...newPage });
});

const handleAddSection = () => {
  const newSection = initSection();
  addSectionToPage(pages.value[0].id, newSection);
  pushSection(newSection);
};

const handleRemoveSection = (sectionIdx: number, event: MouseEvent) => {
  event.stopPropagation();
  if (pages.value[0].id) removeSectionFromPage(pages.value[0].id, sectionIdx);
  removeSection(sectionIdx);
};

const handleBlockAdd = (section: Section) => {
  sectionId.value = section.id;
  isModalActive.value = true;
};

const handleBlockAdded = (data: Record<string, any>) => {
  const { sectionId, blockForm } = data;
  const sectionIdx = pages.value[0].sections.findIndex((s: any) => s.id === sectionId);

  if (sectionIdx !== -1) {
    const currentBlocks = useFieldValue("sections");

    if (currentBlocks && Array.isArray(currentBlocks)) {
      setFieldValue(`sections[${sectionIdx}].blocks`, [...currentBlocks, blockForm]);
    } else {
      setFieldValue(`sections[${sectionIdx}].blocks`, [blockForm]);
    }
  }
};
const handleBlockEdit = (data: Record<string, any>) => {};

const handleBlockRemove = (data: Record<string, any>) => {
  const { sectionId } = data;
  const sectionIdx = pages.value[0].sections.findIndex((s: any) => s.id === sectionId);
  const section = pages.value[0].sections.find((s: any) => s.id === sectionId);

  if (section && section.blocks) setFieldValue(`sections[${sectionIdx}].blocks`, section.blocks);
};

const handleChange = (val: string[]) => {
  activeKey.value = val;
};

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<style scoped></style>
