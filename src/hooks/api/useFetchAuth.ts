import { ref, toRefs } from "vue";
import { login, logout, signUp } from "@/services/modules/auth.service";

export default function useFetchAuth() {
  const isLoading = ref(false);
  const response = ref({});
  const errors = ref(null);

  const doLogin = async (data: Auth.Login) => {
    isLoading.value = true;

    try {
      const res = await login(data);
      response.value = res?.data?.data;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  const doSignUp = async (data: Auth.Register) => {
    isLoading.value = true;

    try {
      const res = await signUp(data);
      response.value = res?.data?.data;
    } catch (err) {
      const { data } = err as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  const doLogout = async () => {
    isLoading.value = true;

    try {
      const res = await logout();
      response.value = res?.data?.data;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    doLogin,
    doLogout,
    doSignUp,
    ...toRefs({ isLoading, response, errors }),
  };
}
