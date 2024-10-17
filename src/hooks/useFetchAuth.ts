import { ref } from "vue";
import { login, logout, signUp } from "@/services/modules/auth.service";
import type { Access, Login, Register } from "@/types";

export default function useFetchAuth() {
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

  return {
    doLogin,
    doLogout,
    doRegister,
    isLoading,
    errors,
    response,
  };
}
