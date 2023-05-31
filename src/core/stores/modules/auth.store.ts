import { defineStore } from "pinia";
import { profile } from "@/core/services/modules/login.service";
import type { AdminUserInfo, AdminUserState } from "@/core/interfaces/auth";

export const useAuthStore = defineStore("AuthStore", {
  state: (): AdminUserState => ({
    token: sessionStorage.getItem("token") || null,
    name: "admin",
    profiles: {},
  }),

  actions: {
    resetToken() {
      this.token = "";
      this.profiles = {};
    },

    setToken(token: string) {
      this.token = token;
      sessionStorage.setItem("token", token);
    },

    setProfile(profiles: AdminUserInfo) {
      this.profiles = profiles;
    },

    async getProfile() {
      const res = await profile({ params: { with: "roles.permissions,clients" } });

      this.profiles = res ? { ...res } : {};
    },

    async logout() {
      this.token = this.name = "";
      this.profiles = {};
      sessionStorage.removeItem("token");
    },
  },
});
