<template>
  <form class="variant__list">
    <a-card class="variant__item" :title="`Variant ${index}`" v-for="(variant, index) in data" :key="index">
      <template #extra>
        <button type="button" @click="removeVariantItem(index)" class="btn-close">
          <IconClose />
        </button>
      </template>
      <!-- Product Variant Header -->
      <div class="variant__header">
        <InputBase
          type="text"
          :name="`title[${index}]`"
          :value="variant.title"
          label="Title"
          rules="required"
          class="variant__title"
        />

        <!-- Button Save  -->
        <!--        <a-button type="primary">-->
        <!--          {{ $t('COMMON.SAVE') }}-->
        <!--        </a-button>-->
      </div>

      <!-- Product Print Side -->
      <div class="variant__sides">
        <div class="variant__sides-wrap">
          <!-- Front Button -->
          <a-button html-type="submit" type="primary" class="variant__sides-btn">Front</a-button>

          <!-- Back Button -->
          <a-button html-type="submit" type="primary" class="variant__sides-btn"> Back</a-button>

          <!-- Left Button -->
          <a-button html-type="submit" type="primary" class="variant__sides-btn"> Right</a-button>

          <!-- Right Button -->
          <a-button html-type="submit" type="primary" class="variant__sides-btn"> Left</a-button>
        </div>

        <a-button type="primary" class="variant__sides-btn variant__sides-detail">
          <IconArrowDoubleRight />
        </a-button>
      </div>
    </a-card>
    <div class="area__action">
      <a-button type="primary" class="btn-add">
        {{ $t("COMMON.SAVE") }}
      </a-button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { transformErrors } from "@/shared/utils/transformErrors";
import { useUpdateVariant } from "@/shared/composables/useVariantQuery";

import InputBase from "@/components/form/InputBase.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconArrowDoubleRight from "@/components/icons/IconArrowDoubleRight.vue";

const props = defineProps({
  data: { type: Array, required: true },
  isLoading: { type: Boolean, required: false },
});

const { remove: removeVariant, push: pushVariant, fields: variant, move: moveVariant } = useFieldArray("variant");

const { handleSubmit, setErrors } = useForm({
  initialValues: {
    variant: [...props.data],
  },
});

const removeVariantItem = (idx: number) => {
  removeVariant(idx);
};
</script>
