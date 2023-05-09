<template>
  <a-card>
    <a-form @submit="onSubmit" layout="vertical">
      <a-row :gutter="[15, 15]" class="mb-20">
        <a-col :xs="24" :sm="24" :md="8" :lg="6">
          <InputBase name="name" :label="$t('ORDER.NAME')" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="6">
          <InputBase name="product_name" :label="$t('ORDER.PRODUCT_NAME')" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="6">
          <InputBase name="email" :label="$t('ORDER.EMAIL')" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="6">
          <InputBase name="adress" :label="$t('ORDER.ADDRESS')" />
        </a-col>
      </a-row>
      <a-row justify="end">
        <a-space>
          <a-button @click="resetForm">
            {{ $t("COMMON.RESET") }}
          </a-button>
          <a-button type="primary" html-type="submit">
            {{ $t("COMMON.SEARCH") }}
          </a-button>
        </a-space>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import InputBase from "@/components/form/InputBase.vue";
import type { OrderSearchParams } from "@/core/types/actions/order.actions";
const emits = defineEmits(["search"]);
const { handleSubmit, resetForm } = useForm<OrderSearchParams>({
  initialValues: {
    name: "",
    product_name: "",
    email: "",
    adress: "",
  },
});
const onSubmit = handleSubmit((values, actions) => {
  emits("search", values);
});
</script>

<style scoped></style>
