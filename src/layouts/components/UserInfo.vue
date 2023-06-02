<template>
  <el-dropdown trigger="click" class="user-info h-full flex flex-center">
    <div class="flex flex-center user-info__wrap">
      <span class="user-info__avatar">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="20" />
      </span>

      <span class="user-info__name"> Admin</span>
    </div>

    <template #dropdown>
      <el-dropdown-menu class="user-info__menu">
        <el-dropdown-item class="user-info__menu-item">
          <IconUser />
          <RouterLink to="/"> View Profile </RouterLink>
        </el-dropdown-item>
        <el-dropdown-item class="user-info__menu-item">
          <IconSetting />
          <RouterLink to="/"> Account Settings </RouterLink>
        </el-dropdown-item>
        <el-dropdown-item class="user-info__menu-item">
          <IconLogout />
          <a @click="handleLogout"> Logout </a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import IconUser from "@/components/icons/IconUser.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import IconSetting from "@/components/icons/IconSetting.vue";

import { useAuthStore } from "@/core/stores/modules/auth.store";
import SvgIcon from "@/components/SvgIcon.vue";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
<style lang="scss"></style>
