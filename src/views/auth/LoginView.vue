<template>
  <AuthWrapper>
    <template #authLeft>
      <div class="auth__left">
        <LoginSwiper />
      </div>
    </template>
    <template #authRight>
      <LoginForm />
    </template>
  </AuthWrapper>
</template>
<script setup lang="ts">
import AuthWrapper from "./AuthWrapper.vue";
import LoginForm from "./LoginForm.vue";
import LoginSwiper from "./LoginSwiper.vue";
</script>
