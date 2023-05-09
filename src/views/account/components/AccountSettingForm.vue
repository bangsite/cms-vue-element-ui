<template>
  <a-spin :spinning="isFetching">
    <a-form layout="vertical" @submit="onSubmit">
      <a-row :gutter="16">
        <a-col :xs="24" :sm="24" :md="12" :lg="12">
          <InputBase name="name" :label="$t('USER.NAME')" rules="required" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12">
          <InputBase name="email" :label="$t('USER.EMAIL')" rules="required|email_format" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12">
          <PasswordBase name="password" :label="$t('USER.PASSWORD')" rules="password" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12">
          <PasswordBase
            name="password_confirmation"
            :label="$t('USER.PASSWORD_CONFIRMATION')"
            rules="password|confirmed:@password"
          />
        </a-col>
      </a-row>
      <a-button type="primary" html-type="submit" :loading="isLoading">
        {{ $t("COMMON.UPDATE") }}
      </a-button>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
import InputBase from "@/components/form/InputBase.vue";

import PasswordBase from "@/components/form/PasswordBase.vue";
import useVeeForm from "@/shared/composables/useVeeForm";
import type { UpdateProfile } from "@/core/interfaces/auth";
import { useUpdateProfileMutation } from "@/shared/composables/useAuthMutation";
import { useGetProfileQuery } from "@/shared/composables/useAuthQuery";

const { handleSubmit, setValues, setFieldError } = useVeeForm<UpdateProfile>();
const { isFetching, data } = useGetProfileQuery({
  onSuccess: (res) => {
    setValues({
      name: res.data.name,
      email: res.data.email,
      password: "",
      password_confirmation: "",
    });
  },
});
const { mutate, isLoading } = useUpdateProfileMutation();

const onSubmit = handleSubmit((values: any) => {
  const filteredValues = Object.keys(values).reduce((acc, key) => {
    if (values[key] !== "") {
      acc[key as keyof UpdateProfile] = values[key];
    }
    return acc;
  }, {} as Partial<UpdateProfile>);

  mutate(filteredValues, {
    onError: (err) => {
      const errors = (err as any).data?.errors as Array<object>;
      if (errors) {
        errors.forEach((error) => {
          const { field, message } = error as any;
          setFieldError(field, message);
        });
      }
    },
  });
});
</script>

<style scoped></style>
