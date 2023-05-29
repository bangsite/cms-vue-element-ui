import { defineStore } from "pinia";
import type { AdminUserState, AdminUserInfo } from "@/core/types/models/auth";
import { profile } from "@/core/services/modules/login.service";

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
            const { data } = await profile({ params: { with: "roles.permissions,clients" } });

            this.profiles = { ...data };
        },

        async logout() {
            this.token = this.name = "";
            this.profiles = {};
            sessionStorage.removeItem("token");
        },
    },
});
