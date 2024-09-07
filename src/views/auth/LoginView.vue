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
import { type Component, computed, defineAsyncComponent } from "vue";

import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

import AuthWrapper from "./AuthWrapper.vue";
import LoginSwiper from "./LoginSwiper.vue";

// Import dynamic layout components asynchronously
const DYNAMIC_LAYOUT: Record<string, Component> = {
  LoginForm: defineAsyncComponent(() => import("@/views/auth/LoginForm.vue")),
  RegisterForm: defineAsyncComponent(() => import("@/views/auth/RegisterForm.vue")),
};

const { layoutForm } = storeToRefs(useAuthStore());
const currentLayoutComponent = computed(() => DYNAMIC_LAYOUT[layoutForm.value]);
</script>
