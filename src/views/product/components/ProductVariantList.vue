<template>
  <div class="variant__list">
    <a-card class="variant__item" :title="`Variant ${index}`" v-for="(variant, index) in variantList" :key="index">
      <template #extra>
        <button type="button" @click="removeVariantItem(index)" class="btn-close">
          <IconClose />
        </button>
      </template>
      <!-- Product Variant Header -->
      <VeeForm class="variant__header" @submit="onSubmitTitleVariant(variant?.id)">
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
      </VeeForm>

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
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { transformErrors } from "@/shared/utils/transformErrors";
import { useUpdateVariant } from "@/shared/composables/useVariantQuery";

import InputBase from "@/components/InputBase.vue";
import IconClose from "@/components/icons/IconClose.vue";
import IconArrowDoubleRight from "@/components/icons/IconArrowDoubleRight.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  data: { type: Array, required: true },
});

const route = useRoute();
const productId = ref(route.params.productId as string);
const variantList = computed(() => props.data);

console.log(variantList.value);

const { handleSubmit, setErrors, errors } = useForm({
  initialValues: {
    variant: [...variantList.value],
  },
});

const { remove: removeVariant, push: pushVariant, fields: variant, move: moveVariant } = useFieldArray("variant");

const removeVariantItem = (idx: number) => {
  removeVariant(idx);
};

const onSubmitTitleVariant = (variantId: string) =>
  handleSubmit(async (values, actions) => {
    const { mutateAsync } = useUpdateVariant(productId.value, variantId);
    console.log(errors);
    await mutateAsync(values, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        const { data } = error as Record<string, any>;
        let newErrors = transformErrors(data?.errors || {});
        setErrors(newErrors);
      },
    });

    actions.resetForm();
  });
</script>
