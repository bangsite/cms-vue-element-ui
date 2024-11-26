<template>
  <div
    class="bg-transparent hover:bg-gray-100 border cursor-pointer flex items-center justify-center w-9 h-9 rounded-full ml-2"
  >
    <el-dropdown>
      <el-button link class="rounded-full">
        <SvgIcon :icon="'logos:zenhub-icon'" :size="20" />
      </el-button>

      <template #dropdown>
        <el-dropdown-menu class="py-3">
          <el-dropdown-item class="py-2">
            <el-link :underline="false" @click="handleSetStatus">
              <SvgIcon :icon="'ant-design:user-outlined'" :size="20" class="mr-2" />
              <span>Set status </span>
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item class="py-2">
            <el-link :underline="false" @click="handleSetting">
              <SvgIcon :icon="'ant-design:setting-outlined'" :size="20" class="mr-2" />
              <span>Account Settings</span>
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item class="py-2">
            <el-link :underline="false" @click="handleLogout">
              <SvgIcon :icon="'tabler:logout'" :size="20" class="mr-2" />
              <span>Logout</span>
            </el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import SvgIcon from "@/components/common/SvgIcon.vue";
import useAuth from "@/hooks/api/useAuth";

const { doLogout, response } = useAuth();
const { resetAuth } = useAuthStore();
const router = useRouter();

const handleSetStatus = () => {
  console.log("");
};

const handleSetting = () => {
  console.log("");
};
const handleLogout = async () => {
  await doLogout();
  resetAuth();
  await router.push("/login");
};
</script>
<style lang="scss" scoped></style>
