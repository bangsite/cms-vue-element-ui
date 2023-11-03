<template>
  <el-dropdown trigger="click" arrow class="user w-60px h-full flex flex-center">
    <div class="flex flex-center user__wrap">
      <span class="user__avatar">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="20" />
      </span>

      <span class="user__name"> Admin</span>
    </div>

    <template #overlay>
      <el-menu class="user__menu">
        <el-menu-item class="user__menu-item">
          <SvgIcon :icon="'ant-design:user-outlined'" :size="20" />

          <RouterLink to="/"> View Profile </RouterLink>
        </el-menu-item>
        <el-menu-item class="user__menu-item">
          <SvgIcon :icon="'ant-design:setting-outlined'" :size="20" />

          <RouterLink to="/"> Account Settings </RouterLink>
        </el-menu-item>
        <el-menu-item class="user__menu-item">
          <SvgIcon :icon="'tabler:logout'" :size="20" />
          <a @click="handleLogout"> Logout </a>
        </el-menu-item>
      </el-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import SvgIcon from "@/components/common/SvgIcon.vue";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  // authStore.logout();
  router.push("/login");
};
</script>
<style lang="scss"></style>
