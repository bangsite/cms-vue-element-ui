import { defineStore } from "pinia";
import { profile } from "@/core/services/modules/login.service";
import type { AdminUserInfo, AuthState } from "@/core/interfaces/auth.interface";
import { getUserInfo } from "@/shared/utils/getUserInfo";

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState => ({
    token: sessionStorage.getItem("token") || "",
    userInfo: getUserInfo() as Auth.UserInfo,
    loginLoading: false,
  }),

  getters: {
    isLogin(state) {
      return Boolean(state.token);
    },
  },

  actions: {
    resetAuthStore() {},

    resetToken() {
      this.token = "";
      // this.profiles = {};
    },

    setToken(token: string) {
      this.token = token;
      sessionStorage.setItem("token", token);
    },

    setProfile(profiles: AdminUserInfo) {
      // this.profiles = profiles;
    },

    async getProfile() {
      const res = await profile({ params: { with: "roles.permissions,clients" } });

      // this.profiles = res ? { ...res } : {};
    },

    async logout() {
      // this.token = this.name = "";
      // this.profiles = {};
      sessionStorage.removeItem("token");
    },
  },
});
