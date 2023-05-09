<template>
  <form class="product__form" @submit="onSubmit">
    <a-card :bordered="false" :title="$t('PRODUCT.CREATE.TITLE')" class="product__form-card mb-20">
      <div class="product__form-wrap mb-20">
        <!-- Product Form Create -->
        <div class="product__form-group">
          <!-- Project Name -->
          <InputBase name="name" :label="$t('PRODUCT.CREATE.PROJECT_NAME')" />

          <!-- Category Name -->
          <InputBase name="category_name" :label="$t('PRODUCT.CREATE.CATEGORY_NAME')" />

          <!-- Description -->
          <TextAreaBase name="status" type="select" :rows="6" :label="$t('PRODUCT.CREATE.DESCRIPTION')" />

          <!-- Upload Images -->
          <UploadImages label="Upload Image" class="upload__images" name="files" />
        </div>

        <!-- Product Thumbnail -->
        <div class="product__form-preview">
          <figure>
            <img src="@/assets/images/white_t-shirt.png" alt="white t-shirt" />
          </figure>
        </div>
      </div>

      <!-- Product Create Actions -->
      <div class="product__action">
        <a-button @click="onReset" type="default" class="mr-10 btn-cancel">
          {{ $t("COMMON.RESET") }}
        </a-button>
        <a-button html-type="submit" type="primary" class="btn-save">
          {{ $t("COMMON.BTN_SAVE") }}
        </a-button>
      </div>
    </a-card>
  </form>
</template>

<script lang="ts" setup>
import useVeeForm from "@/shared/composables/useVeeForm";
import InputBase from "@/components/form/InputBase.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";
import UploadImages from "@/components/upload/UploadImages.vue";

const { handleSubmit, errors } = useVeeForm();

const onSubmit = handleSubmit((values, actions) => {
  console.log(values);
});

const onReset = () => {};
</script>

<style scoped></style>
