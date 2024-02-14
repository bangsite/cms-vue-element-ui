<template>
  <div class="post__create">
    <form class="form post__create-form" @submit="onSubmit">
      <div class="post__create-left">
        <a-card title="Add new post" class="form__card">
          <div class="post__create-title">
            <InputBase name="title" rules="required" placeholder="Enter title here" />

            <TextAreaBase name="description" rules="required" placeholder="Enter description here" />
          </div>
          <div class="post__create-body">
            <EditorTinyMCE name="body" rules="required" placeholder="Please input content!" />
          </div>
        </a-card>
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
import { onBeforeMount, onMounted } from "vue";
import { useForm } from "vee-validate";
import { useRoute } from "vue-router";

import InputBase from "@/components/form/InputBase.vue";
import Categories from "@/components/posts/Categories.vue";
import Tags from "@/components/posts/Tags.vue";
import Thumbnail from "@/components/posts/Thumbnail.vue";
import EditorTinyMCE from "@/components/form/EditorTinyMCE.vue";
import ActionSubmit from "@/components/posts/ActionSubmit.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";

import { useSubmitForm } from "@/views/Post/composables/useSubmitForm";
import { convertErrors } from "@/utils/convertErrors";
import { PRODUCT_FORM } from "@/views/Product/composables/useDataForm";

const route = useRoute();
const { handleSubmit, setErrors, setFieldValue, setValues, errors, isSubmitting, values } = useForm({
  initialValues: {
    ...PRODUCT_FORM,
  },
});

const { responseApi, errorsAPI, status, onCreate, onUpdate } = useSubmitForm();

const onSubmitPublish = handleSubmit(async (values) => {
  if (route?.params?.id) {
    await onUpdate(route.params.id, values);
  } else {
    await onCreate(values);
  }

  if (status.value === 200) {
    // show notify
    // back to list
  }

  if (errorsAPI.value && Object.keys(errorsAPI.value).length) {
    // set error key each field of form
    const errs = convertErrors(errorsAPI);
    setErrors(errs);
  }
});

const onSubmitDraft = (event) => {
  console.log(event);
};

const onModalPreview = (event) => {
  console.log(event);
};

const onSubmit = () => {};

onBeforeMount(() => {
  // load data api related
});

onMounted(() => {
  // set data
  // action
});
</script>

<style scoped></style>
