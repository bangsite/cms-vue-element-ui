import { loginWithAuthCallback } from "@/services/modules/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

export default function useAuth() {
  const { setUserInfo, setToken } = useAuthStore();
  const router = useRouter();

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
  };
}
