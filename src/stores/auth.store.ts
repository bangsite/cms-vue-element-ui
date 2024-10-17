import { acceptHMRUpdate, defineStore } from "pinia";
import { ClientStorage, deleteCookie, setCookie } from "@/utils";
import type { AuthState, Tokens } from "@/types";

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState =>
    <AuthState>{
      userInfo: {
        id: "",
        name: "",
        email: "",
        roles: [],
      },
      layoutForm: "LoginForm",
      isAuth: false,
    },

  getters: {
    isLogin(): boolean {
      return this.isAuth;
    },
  },

  actions: {
    setLayoutAuth(name: string) {
      this.layoutForm = name;
    },

    setUserInfo(user: Record<string, any>) {
      if (user && Object.keys(user).length > 0) {
        this.userInfo = {
          id: user._id || user.user_id,
          name: user.user_name || user.shop_name || user.admin_name,
          email: user.user_email || user.shop_email || user.admin_email,
          roles: [user.user_role || user.shop_role || user.admin_role],
        };

        this.isAuth = true;

        ClientStorage.save("__user_info__", { ...this.userInfo });
        ClientStorage.save("__is_auth__", this.isAuth);
      }
    },

    setToken(tokens: Partial<Tokens>) {
      const { accessToken, refreshToken } = tokens;

      if (accessToken) setCookie("__x_key_at__", accessToken);
      if (refreshToken) setCookie("__x_key_rf__", refreshToken);
    },

    resetAuth() {
      ClientStorage.clear();
      deleteCookie("__x_key_at__");
      deleteCookie("__x_key_rf__");

      this.userInfo = {
        id: "",
        name: "",
        email: "",
        roles: [],
      };
      this.isAuth = false;
    },
  },
});

if (import.meta?.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
