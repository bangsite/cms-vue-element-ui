<template>
  <div class="auth__right">
    <div class="auth__header">
      <div class="auth__header-logo">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="30"></SvgIcon>
      </div>
      <h3 class="auth__header-title">System Manager</h3>
      <p class="auth__header-subtitle">
        A management system is in place for analytics and informative and just beautiful.
      </p>
    </div>
    <div class="auth__form">
      <el-form require-asterisk-position="right" labelPosition="top" ref="formRef" class="form">
        <InputBase label="Email" name="email" rules="required|email" placeholder="Enter email..." style="width: 100%" />

        <PasswordBase
          label="Password"
          name="password"
          rules="required"
          placeholder="Enter password..."
          style="width: 100%"
        />

        <el-button size="large" type="primary" class="btn-submit mb-4 mt-4" :disabled="isLoading" @click="onSubmit"
          >Sign up
        </el-button>
      </el-form>
      <div class="flex flex-col">
        <el-row :gutter="10" justify="center" class="w-full">
          <span class="mr-1 text-gray-600">Don't have an account yet ? </span>
          <el-link href="#" @click="handleRegister"><strong>Sign in</strong></el-link>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";

import LoginSSO from "@/views/auth/LoginSSO.vue";
import InputBase from "@/components/form/InputBase.vue";
import PasswordBase from "@/components/form/PasswordBase.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

import { useAuthStore } from "@/stores/auth.store";
import useFetchAuth from "@/hooks/useFetchAuth";
import type { Register } from "@/types";
// import { transformErrors } from "@/shared/utils/transformErrors";

const router = useRouter();
const { doRegister, response, errors, isLoading } = useFetchAuth();
const { setUserInfo, setLayoutAuth } = useAuthStore();

const ruleForm = ref<Register>({
  email: "",
  password: "",
});

const { handleSubmit, setErrors } = useForm({ initialValues: { ...ruleForm.value } });

const onSubmit = handleSubmit(async (values, actions) => {
  await doRegister(values);

  const { shop }: Record<string, any> = response.value || {};
  if (shop) setUserInfo(shop);

  if (errors.value) console.log("errors:::", errors.value);

  await router.push("/");

  actions.resetForm();
});

const handleRegister = () => setLayoutAuth("LoginForm");
</script>
