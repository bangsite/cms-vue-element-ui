<template>
  <div class="post__create">
    <form class="form post__create-form" @submit="onSubmit">
      <div class="post__create-left">
        <el-card title="Add new post" class="form__card">
          <div class="post__create-title">
            <InputBase name="title" rules="required" placeholder="Enter title here" />

            <TextAreaBase name="description" rules="required" placeholder="Enter description here" />
          </div>
          <div class="post__create-body">
            <EditorTinyMCE name="body" rules="required" placeholder="Please input content!" />
          </div>
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
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";

import InputBase from "@/components/form/InputBase.vue";
import Categories from "@/components/posts/Categories.vue";
import Tags from "@/components/posts/Tags.vue";
import Thumbnail from "@/components/posts/Thumbnail.vue";
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import ActionSubmit from "@/components/posts/ActionSubmit.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";

import { PRODUCT_FORM } from "@/views/product/composables/useDataForm";

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
