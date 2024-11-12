import { ref } from "vue";
import { login, loginWithAuthCallback, logout, signUp } from "@/services/modules/auth.service";
import type { Access, Login, Register } from "@/types";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

export default function useAuth() {
  const { setUserInfo, setToken } = useAuthStore();
  const router = useRouter();

  const isLoading = ref(false);
  const response = ref<Access | null>(null);
  const errors = ref(null);

  const handleApiCall = async (apiFunc: Function, data: number | string | [] | {}) => {
    isLoading.value = true;

    try {
      const res = await apiFunc(data);
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message;
    } finally {
      isLoading.value = false;
    }
  };

  const doLogin = async (data: Login) => {
    await handleApiCall(login, data);
  };

  const doRegister = async (data: Register) => {
    await handleApiCall(signUp, data);
  };

  const doLogout = async () => {
    await handleApiCall(logout, {});
  };

  const authCallback = async (provider: string, code: string) => {
    try {
      const res = await loginWithAuthCallback(provider, { params: { code: code } });
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { user, tokens } = res?.data?.data;
      if (user) setUserInfo(user);
      if (tokens) setToken(tokens);

      window.history.replaceState({}, document.title, window.location.pathname);
      await router.replace({ name: "Dashboard" });
    } catch (err) {
      throw new Error(`SSO Login Error ${err}`);
    }
  };

  return {
    authCallback,
    doLogin,
    doLogout,
    doRegister,
    isLoading,
    errors,
    response,
  };
}
