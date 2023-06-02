<template>
  <div class="auth__right">
    <h3 class="auth__title">System Manager</h3>
    <p class="auth__subtitle">
      We strongly believe that the interface should be clear, informative and just beautiful.
    </p>

    <el-form :model="data" class="form">
      <div class="form__group">
        <label for="email">Username</label>
        <InputBase name="email" rules="required" placeholder="Please input your username!" :autocomplete="'off'" />
      </div>

      <div class="form__group">
        <label for="password">Password</label>
        <PasswordBase name="password" rules="required" placeholder="Please input your password!" />
      </div>

      <div class="form__group">
        <el-checkbox v-model:checked="data.remember">Remember me</el-checkbox>
      </div>

      <div class="form__group">
        <el-button type="primary" @click="onSubmit" class="btn-submit w-100">Submit</el-button>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "vue-query";
import { useForm } from "vee-validate";

import type { LoginInput } from "@/core/interfaces/auth";
import { login } from "@/core/services/modules/login.service";
import InputBase from "@/components/form/InputBase.vue";
import PasswordBase from "@/components/form/PasswordBase.vue";

import { useAuthStore } from "@/core/stores/modules/auth.store";
import { transformErrors } from "@/shared/utils/transformErrors";

const authStore = useAuthStore();
const router = useRouter();

const data = ref<LoginInput>({
  email: "",
  password: "",
  //   remember: false,
});

const { handleSubmit, setErrors } = useForm({ initialValues: { ...data.value } });

const useDoLogin = () => {
  return useMutation((data: LoginInput) => login(data));
};

const { mutateAsync } = useDoLogin();

const onSubmit = handleSubmit(async (values, actions) => {
  await mutateAsync(values, {
    onSuccess: (data) => {
      authStore.setToken(data.token);
      authStore.getProfile();
      router.push({ name: "dashboard" });
    },
    onError: (error) => {
      const { data } = error as Record<string, any>;

      let errors = transformErrors(data.errors);
      setErrors(errors as object);
    },
  });

  actions.resetField;
});
</script>
