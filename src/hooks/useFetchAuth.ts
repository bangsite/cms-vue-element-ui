import { ref } from "vue";
import { login, logout, signUp } from "@/services/modules/auth.service";
import type { Login, Register } from "@/types";

export default function useFetchAuth() {
  const isLoading = ref(false);
  const response = ref(null);
  const errors = ref(null);

  const handleApiCall = async (apiFunc: Function, data: any) => {
    isLoading.value = true;

    try {
      const res = await apiFunc(data);
      response.value = res?.data?.data;
    } catch (error: any) {
      errors.value = error.response?.data || error.message;
    } finally {
      isLoading.value = false;
    }
  };
  const doLogin = async (data: Login) => {
    await handleApiCall(login, data);
  };

  const doSignUp = async (data: Register) => {
    await handleApiCall(signUp, data);
  };

  const doLogout = async () => {
    await handleApiCall(logout, {});
  };

  return {
    doLogin,
    doLogout,
    doSignUp,
    isLoading,
    errors,
    response,
  };
}
