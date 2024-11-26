<template>
  <div class="post__create">
    <form class="form post__create-form" @submit="onSubmit">
      <div class="post__create-left">
        <el-card title="Add new post" class="form__card">
          <InputBase name="title" rules="required" placeholder="Enter title here" />
          <TextAreaBase name="description" row="6" rules="required" placeholder="Enter description here" />
          <EditorTinyMCE name="body" rules="required" placeholder="Please input content!" />
        </el-card>
        <DataJsonPretty :data="values" :showLine="true" />
      </div>

      <div class="post__create-right">
        <ActionSubmit @onPublish="onSubmitPublish" @onDraft="onSubmitDraft" @onPreview="onModalPreview" />

        <!--Begin Categories-->
        <Categories name="categories" :data="POST_CATEGORIES" @checked="handleCheckedCategories" />
        <!--End Categories-->

        <!--Begin Tags-->
        <Tags name="tags" @addTag.prevent="" :data="POST_TAGS" />
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
import Categories from "@/components/common/Categories.vue";
import Tags from "@/components/common/Tags.vue";
import Thumbnail from "@/components/posts/Thumbnail.vue";
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import ActionSubmit from "@/components/posts/ActionSubmit.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";
import DataJsonPretty from "@/components/common/DataJsonPretty.vue";

import { useSubmitForm } from "@/views/post/composables/useSubmitForm";
import { POST_CATEGORIES, POST_FORM, POST_TAGS } from "@/constants/post.contant";

const route = useRoute();
const { values, handleSubmit } = useForm({
  initialValues: {
    ...POST_FORM,
  },
});

const { onCreate, onUpdate } = useSubmitForm();

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

const onSubmit = () => {};
</script>

<style scoped></style>
