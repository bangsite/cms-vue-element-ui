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
      <form class="form" @submit="onSubmit">
        <div class="form__group">
          <label for="email">Email</label>
          <InputBase name="email" rules="required|email" placeholder="Please input your username!" />
        </div>

        <div class="form__group">
          <label for="password">Password</label>
          <PasswordBase name="password" rules="required" placeholder="Please input your password!" />
        </div>

        <div class="form__group form__group--flex mb-50">
          <a-checkbox v-model:checked="data.remember">Remember me</a-checkbox>
          <a href="#">Recovery Password</a>
        </div>

        <div class="form__group">
          <a-button type="primary" class="btn-submit w-100 mb-10" htmlType="submit" :disabled="isLoading"
            >Submit
          </a-button>
          <a-button type="default" class="btn-submit btn-submit--social w-100" htmlType="submit" :disabled="isLoading">
            <SvgIcon :icon="'flat-color-icons:google'" :size="30"></SvgIcon>
            <span> Sign in with Google </span>
          </a-button>
        </div>
      </form>
    </div>

    <div class="auth__footer">
      <div class="auth__footer-signup">
        <span>Don't have an account yet ?</span>
        <a href="#">Sign Up</a>
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

import { useAuthStore } from "@/stores/auth.store";
import type { UserLogin } from "@/core/interfaces/user.interface";
import SvgIcon from "@/components/common/SvgIcon.vue";
import useAuth from "@/composables/useAuth";
// import { transformErrors } from "@/shared/utils/transformErrors";

const router = useRouter();
const authStore = useAuthStore();
const { doLogin, response, errors, isLoading } = useAuth();

const data = ref<UserLogin>({
  email: "",
  password: "",
  remember: false,
});

const { handleSubmit, setErrors } = useForm({ initialValues: { ...data.value } });

const onSubmit = handleSubmit(async (values, actions) => {
  await doLogin(values);
  console.log(response.value);

  const { shop, tokens } = response.value;
  if (shop) authStore.setUserInfo(shop);
  if (tokens) authStore.setToken(tokens);

  if (errors.value) {
    console.log("errors:::", errors.value);
  }

  await router.push("/dashboard");

  actions.resetForm();
});
</script>
