<template>
  <div class="auth__right">
    <div class="auth__header">
      <div class="bg-gray-50 flex items-center justify-center mb-6 w-[60px] h-[60px] rounded-full">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="30" />
      </div>
      <h2 class="text-2xl mb-2">Create account</h2>
      <p class="max-w-lg text-center">Welcome back! Please your enter details</p>
    </div>
    <div class="auth__form">
      <el-form require-asterisk-position="right" labelPosition="top" ref="formRef" class="form">
        <InputBase label="Email" name="email" rules="required|email" placeholder="Enter email..." style="width: 100%" />

        <PasswordBase
          label="Password"
          name="password"
          rules="required|password|max:30"
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

import InputBase from "@/components/form/InputBase.vue";
import PasswordBase from "@/components/form/PasswordBase.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

import { useAuthStore } from "@/stores/auth.store";
import useAuth from "@/hooks/api/useAuth";

import type { Register } from "@/types";
// import { transformErrors } from "@/shared/utils/transformErrors";

const router = useRouter();
const { doRegister, response, errors, isLoading } = useAuth();
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

  await router.push("/");

  actions.resetForm();
});

const handleRegister = () => setLayoutAuth("LoginForm");
</script>
