<template>
  <div class="setting">
    <a-dropdown placement="bottomLeft" trigger="['hover']">
      <div class="setting__wrap">
        <button class="setting__avatar">
          <IconUser />
        </button>
        <!-- <span class="setting__name"> Admin</span> -->
      </div>

      <template #overlay>
        <a-menu class="setting__menu">
          <li class="setting__menu-item">
            <IconUser />
            <RouterLink to="/"> View Profile </RouterLink>
          </li>
          <li class="setting__menu-item">
            <IconSetting />
            <RouterLink :to="{ name: 'account-setting' }"> Account Settings </RouterLink>
          </li>
          <li class="setting__menu-item">
            <IconLogout />
            <a @click="handleLogout"> Logout </a>
          </li>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import IconUser from "@/components/icons/IconUser.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconSetting from "@/components/icons/IconSetting.vue";

import { useAuthStore } from "@/core/stores/auth.store";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
<style lang="scss"></style>
