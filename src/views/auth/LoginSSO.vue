<template>
  <el-row :gutter="10" justify="center" class="w-full mb-8">
    <el-button size="large" class="btn-login--social" @click="loginWithProvider('google')" circle>
      <SvgIcon :icon="'flat-color-icons:google'" :size="24" />
    </el-button>
    <el-button size="large" class="btn-login--social" @click="loginWithProvider('facebook')" circle>
      <SvgIcon :icon="'logos:facebook'" :size="24" />
    </el-button>
    <el-button size="large" class="btn-login--social" @click="loginWithProvider('github')" circle>
      <SvgIcon :icon="'ri:github-fill'" :size="24" />
    </el-button>
  </el-row>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/common/SvgIcon.vue";
import { loginWithAuth } from "@/services/modules/auth.service";
import { ClientStorage } from "@/utils";

const loginWithProvider = async (provider: string) => {
  try {
    ClientStorage.save("__provider__", provider);
    const { data } = await loginWithAuth(provider);

    if (data) window.open(data.data, "_self");
  } catch (err) {
    console.error("SSO Login Error:", err);
  }
};
</script>
