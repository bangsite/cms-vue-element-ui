<template>
  <div class="post__create">
    <form class="form post__create-form" @submit="onSubmit">
      <div class="post__create-left">
        <el-card title="Add new post" class="form__card">
          <div class="post__create-title">
            <InputBase name="title" rules="required" placeholder="Enter title here" />

            <TextAreaBase name="description" row="4" rules="required" placeholder="Enter description here" />
          </div>
          <div class="post__create-body">
            <EditorTinyMCE name="body" rules="required" placeholder="Please input content!" />
          </div>
        </el-card>
      </div>

      <div class="post__create-right">
        <ActionSubmit @onPublish="onSubmitPublish" @onDraft="onSubmitDraft" @onPreview="onModalPreview" />

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
import { useRoute } from "vue-router";

import InputBase from "@/components/form/InputBase.vue";
import Categories from "@/components/posts/Categories.vue";
import Tags from "@/components/posts/Tags.vue";
import Thumbnail from "@/components/posts/Thumbnail.vue";
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import ActionSubmit from "@/components/posts/ActionSubmit.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";

import { POST_FORM } from "@/views/Post/composables/useDataForm";
import { useSubmitForm } from "@/views/Post/composables/useSubmitForm";

const route = useRoute();
const { handleSubmit } = useForm({
  initialValues: {
    ...POST_FORM,
  },
});

const { onCreate, onUpdate } = useSubmitForm();

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

const onSubmit = () => {};
</script>

<style scoped></style>
