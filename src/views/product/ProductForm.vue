<template>
  <div class="post__create">
    <el-form :labelPosition="'top'" class="form post__create-form">
      <div class="post__create-left">
        <el-card title="Add new post">
          <InputBase label="Product Name" name="title" rules="required" placeholder="Enter name here" />
          <TextAreaBase
            label="Product Description"
            name="description"
            rules="required"
            placeholder="Enter description"
            :rows="4"
          />
          <InputNumber label="Product Price" name="price" rules="required" placeholder="Enter price here" />
          <InputNumber label="Product Quantity" name="quantity" rules="required" placeholder="Enter quantity here" />
          <EditorTinyMCE label="Product Description" name="body" rules="required" placeholder="Please input content!" />
        </el-card>
        <DataJsonPretty :data="values" :showLine="true" />
      </div>

      <div class="post__create-right">
        <ActionSubmit @onPublish="onSubmitPublish" @onDraft="onSubmitDraft" @onPreview="onModalPreview" />

        <!--Begin Categories-->
        <Categories name="categories" :data="PRODUCT_CATEGORIES" @checked="handleCheckedCategories" />
        <!--End Categories-->

        <!--Begin Tags-->
        <Tags name="tags" :data="PRODUCT_TAGS" />
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
import InputNumber from "@/components/form/InputNumber.vue";
import DataJsonPretty from "@/components/common/DataJsonPretty.vue";

import { PRODUCT_CATEGORIES, PRODUCT_FORM, PRODUCT_TAGS } from "@/constants/product.contant";

const { values, handleSubmit } = useForm({
  initialValues: {
    ...PRODUCT_FORM,
  },
});

const handleCheckedCategories = (data: []) => {
  if (data && data.length > 0) {
    setValues("categories", data);
  }
};

const onSubmitPublish = handleSubmit(async (values) => {
  if (route?.params?.id) {
    await onUpdate(route.params.id, values);
  } else {
    await onCreate(values);
  }
});

const onSubmitDraft = (event: any) => {
  console.log(event);
};

const onModalPreview = (event: any) => {
  console.log(event);
};
</script>

<style scoped></style>
