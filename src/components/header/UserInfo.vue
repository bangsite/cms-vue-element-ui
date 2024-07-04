<template>
  <el-dropdown class="ml-10">
    <el-button class="user__avatar">
      <SvgIcon :icon="'logos:zenhub-icon'" :size="20" />
    </el-button>

    <template #dropdown>
      <el-dropdown-menu class="pY-4">
        <el-dropdown-item>
          <el-link :underline="false" @click="handleSetStatus">
            <SvgIcon :icon="'ant-design:user-outlined'" :size="20" class="mr-2" />
            <span>Set status </span>
          </el-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-link :underline="false" @click="handleSetting">
            <SvgIcon :icon="'ant-design:setting-outlined'" :size="20" class="mr-2" />
            <span>Account Settings</span>
          </el-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-link :underline="false" @click="handleLogout">
            <SvgIcon :icon="'tabler:logout'" :size="20" class="mr-2" />
            <span>Logout</span>
          </el-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { deleteCookie } from "@/utils/useCookies";

const { resetAuth } = useAuthStore();
const router = useRouter();

const handleSetStatus = () => {
  console.log("");
};

const handleSetting = () => {
  console.log("");
};
const handleLogout = () => {
  resetAuth();
  deleteCookie("__x_key_at");
  deleteCookie("__x_key_rf");
  router.push("/login");
};
</script>
<style lang="scss"></style>
