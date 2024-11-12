<template>
  <div class="auth__right">
    <div class="auth__header">
      <div class="bg-gray-50 flex items-center justify-center mb-6 w-[60px] h-[60px] rounded-full">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="30" />
      </div>
      <h2 class="text-2xl mb-2">Login to your account</h2>
      <p class="max-w-lg text-center">Welcome back! Please your enter details</p>
    </div>
    <div class="auth__form">
      <el-form require-asterisk-position="right" labelPosition="top" ref="formRef" class="form">
        <InputBase label="Email" name="email" rules="required|email" placeholder="Enter email..." style="width: 100%" />

        <PasswordBase
          label="Password"
          name="password"
          rules="required|min:8"
          placeholder="Enter password..."
          style="width: 100%"
        />

        <el-form-item>
          <div class="flex items-center justify-between w-full">
            <el-checkbox v-model:checked="ruleForm.remember">Remember me</el-checkbox>
            <el-link href="#" disabled>Recovery Password</el-link>
          </div>
        </el-form-item>

        <el-button size="large" type="primary" class="btn-submit mb-4" :disabled="isLoading" @click="onSubmit"
          >Sign in
        </el-button>
      </el-form>
      <div class="flex flex-col">
        <el-row :gutter="10" justify="center" class="w-full">
          <span class="mr-1 text-gray-600">Don't have an account yet ? </span>
          <el-link href="#" @click="handleRegisterNew"><strong>Sign up</strong></el-link>
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

// import { transformErrors } from "@/shared/utils/transformErrors";

interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

const ruleForm = ref<LoginForm>({
  email: "shop@gmail.com",
  password: "@12345678",
  remember: false,
});

const router = useRouter();
const { setUserInfo, setToken, setLayoutAuth } = useAuthStore();
const { doLogin, response, errors, isLoading } = useAuth();
const { handleSubmit } = useForm({ initialValues: { ...ruleForm.value } });

const onSubmit = handleSubmit(async (values, actions) => {
  await doLogin(values);

  const { shop }: Record<string, any> = response.value || {};
  if (shop) setUserInfo(shop);
  // if (tokens) setToken(tokens);

  if (errors.value) {
    console.log("errors:::", errors.value);
  }

  await router.push("/");

  // actions.resetForm();
});

const handleRegisterNew = () => setLayoutAuth("RegisterForm");
</script>
