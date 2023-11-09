<template>
  <AuthWrapper>
    <template #authLeft>
      <div class="auth__left">
        <LoginSwiper />
      </div>
    </template>
    <template #authRight>
      <Transition name="slide" mode="out-in" appear>
        <KeepAlive>
          <component :is="layout" />
        </KeepAlive>
      </Transition>
    </template>
  </AuthWrapper>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import AuthWrapper from "./AuthWrapper.vue";
import LoginSwiper from "./LoginSwiper.vue";

const LoginForm = defineAsyncComponent(() => import("@/views/Auth/LoginForm.vue"));
const RegisterForm = defineAsyncComponent(() => import("@/views/Auth/RegisterForm.vue"));

const DYNAMIC_LAYOUT = {
  LoginForm,
  RegisterForm,
};

const { layoutForm } = storeToRefs(useAuthStore());
console.log(layoutForm.value);

const layout = computed(() => DYNAMIC_LAYOUT[layoutForm.value]);
</script>
