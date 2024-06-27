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
          <component :is="currentLayoutComponent" />
        </KeepAlive>
      </Transition>
    </template>
  </AuthWrapper>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, DefineComponent, reactive, ref, watch } from "vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

import AuthWrapper from "./AuthWrapper.vue";
import LoginSwiper from "./LoginSwiper.vue";

// Define types for dynamic layout components
interface DynamicLayout {
  [key: string]: DefineComponent<{}, {}, {}, {}, {}, {}, {}, {}, string, string>;
}

// Import dynamic layout components asynchronously
const LoginForm = defineAsyncComponent(() => import("@/views/auth/LoginForm.vue"));
const RegisterForm = defineAsyncComponent(() => import("@/views/auth/RegisterForm.vue"));

// Define dynamic layout components
const DYNAMIC_LAYOUT: DynamicLayout = {
  LoginForm,
  RegisterForm,
};

// Access layout form from the store
const { layoutForm } = storeToRefs(useAuthStore());

// Compute the current layout component based on the selected form
const currentLayoutComponent = computed(() => DYNAMIC_LAYOUT[layoutForm.value]);

</script>
