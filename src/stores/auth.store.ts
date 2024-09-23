import { acceptHMRUpdate, defineStore } from "pinia";
import { setCookie } from "@/utils/cookieUtil";
import type { Shop, Tokens } from "@/types";

// Define state type
interface AuthState {
  userInfo: Shop;
  tokens: Tokens;
  layoutForm: string;
  isLoading: boolean;
}

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState => ({
    userInfo: {
      id: "",
      name: "",
      email: "",
      roles: ["ADMIN"],
    },
    tokens: { accessToken: "", refreshToken: "" },
    layoutForm: "LoginForm",
    isLoading: false,
  }),

  getters: {
    isLogin(): boolean {
      return Boolean(this.tokens?.accessToken);
    },
  },

  actions: {
    setLayoutForm(name: string) {
      this.layoutForm = name;
    },
    setUserInfo(data: Partial<Shop>) {
      if (data.id && data.name && data.email) {
        this.userInfo = {
          ...this.userInfo,
          ...data,
        };
      }
    },

    setToken(tokens: Partial<Tokens>) {
      const { accessToken, refreshToken } = tokens;

      if (accessToken) {
        this.tokens.accessToken = accessToken;
        // localStorage.setItem("x-key-at", accessToken);
        setCookie("__x_key_at__", accessToken);
      }

      if (refreshToken) setCookie("__x_key_rf__", refreshToken, { "max-age": 604800 });
    },

    resetAuth() {
      this.userInfo = {
        id: "",
        name: "",
        email: "",
        roles: [],
      };
      this.tokens = { accessToken: "", refreshToken: "" };
    },
  },
});

if (import.meta?.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
