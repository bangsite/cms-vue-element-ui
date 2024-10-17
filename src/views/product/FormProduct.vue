<template>
  <div class="post__create">
    <el-form :labelPosition="'top'" class="form post__create-form" @submit="onSubmit">
      <div class="post__create-left">
        <el-card title="Add new post" class="form__card">
          <InputBase label="Product Name" name="title" rules="required" placeholder="Enter name here" />
          <InputNumber label="Product Price" name="price" rules="required" placeholder="Enter price here" />
          <InputNumber label="Product Quantity" name="quantity" rules="required" placeholder="Enter quantity here" />
          <SelectBase name="type" />
          <EditorTinyMCE label="Product Description" name="body" rules="required" placeholder="Please input content!" />
        </el-card>
      </div>

      <div class="post__create-right">
        <ActionSubmit @onDraft="onSubmitDraft" @onPreview="onModalPreview" />

        <!--Begin Categories-->
        <Categories name="categories" />
        <!--End Categories-->

        <!--Begin Tags-->
        <Tags name="tags" />
        <!--End Tags-->

        <!--Begin Thumbnail-->
        <Thumbnail name="thumbnail" />
        <!--End Thumbnail-->
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

import InputBase from "@/components/form/InputBase.vue";
import Categories from "@/components/common/Categories.vue";
import Tags from "@/components/common/Tags.vue";
import Thumbnail from "@/components/posts/Thumbnail.vue";
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import ActionSubmit from "@/components/posts/ActionSubmit.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";

import { PRODUCT_FORM } from "@/views/product/composables/useDataForm";
import InputNumber from "@/components/form/InputNumber.vue";
import SelectBase from "@/components/form/SelectBase.vue";

const { handleSubmit } = useForm({
  initialValues: {
    ...PRODUCT_FORM,
  },
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const onSubmitDraft = (event: any) => {
  console.log(event);
};

const onModalPreview = (event: any) => {
  console.log(event);
};
</script>

<style scoped></style>
