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
      <el-form :labelPosition="'top'" ref="formRef" class="form">
        <el-form-item label="Email">
          <InputBase name="email" rules="required|email" placeholder="Enter email..." style="width: 100%" />
        </el-form-item>

        <el-form-item label="Password">
          <PasswordBase name="password" rules="required" placeholder="Enter password..." style="width: 100%" />
        </el-form-item>

        <el-form-item jus>
          <el-col :span="16">
            <el-checkbox v-model:checked="ruleForm.remember">Remember me</el-checkbox>
          </el-col>
          <el-col :span="8" style="text-align: end">
            <el-link href="#" disabled>Recovery Password</el-link>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button size="large" type="primary" class="btn-submit mb-10" :disabled="isLoading" @click="onSubmit"
            >Sign in
          </el-button>
          <span class="w-100 text-center"><strong>OR</strong></span>

          <el-row :gutter="10" justify="center" class="w-100">
            <el-button size="large" class="btn-login--social" @click="handleLoginWith" disabled circle>
              <SvgIcon :icon="'flat-color-icons:google'" :size="24" />
            </el-button>
            <el-button size="large" class="btn-login--social" @click="handleLoginWith" disabled circle>
              <SvgIcon :icon="'logos:facebook'" :size="24" />
            </el-button>
          </el-row>

          <el-divider />

          <el-row :gutter="10" justify="center" class="w-100">
            <span class="mr-5">Don't have an account yet ? </span>
            <el-link href="#" @click="handleRegisterNew">Sign Up</el-link>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";

import InputBase from "@/components/form/InputBase.vue";
import PasswordBase from "@/components/form/PasswordBase.vue";

import { useAuthStore } from "@/stores/auth.store";
import type { LoginInput } from "@/core/interfaces/auth.interface";
import SvgIcon from "@/components/common/SvgIcon.vue";
import useAuth from "@/composables/useAuth";
// import { transformErrors } from "@/shared/utils/transformErrors";

const router = useRouter();
const { setUserInfo, setToken, setLayoutForm } = useAuthStore();

const { doLogin, response, errors, isLoading } = useAuth();

const ruleForm: LoginInput = {
  email: "",
  password: "",
  remember: false,
};
console.log(ruleForm);

const { handleSubmit, setErrors } = useForm({ initialValues: { ...ruleForm.value } });

const onSubmit = handleSubmit(async (values, actions) => {
  await doLogin(values);

  const { shop, tokens } = response.value;
  if (shop) setUserInfo(shop);
  if (tokens) setToken(tokens);

  if (errors.value) {
    console.log("errors:::", errors.value);
  }

  await router.push("/dashboard");

  actions.resetForm();
});

const handleLoginWith = () => {};

const handleRegisterNew = () => {
  setLayoutForm("RegisterForm");
};
</script>
