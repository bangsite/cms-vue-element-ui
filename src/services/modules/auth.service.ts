import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Login, Register } from "@/types";
import { BaseApiService } from "@/services/api.service";

const apiRootURL = import.meta.env.VITE_SHOP_ENDPOINT;
const apiXKey = import.meta.env.VITE_SHOP_KEY;
const authApiService = BaseApiService.getInstance(apiRootURL, {
  "x-api-key": apiXKey,
});

const loginWithAuth = (provider: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get(`auth/${provider}`, { ...config });
};

const loginWithAuthCallback = (provider: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get(`auth/${provider}/callback`, {
    ...config,
    withCredentials: true,
  });
};

const login = (data: Login, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/login", data, { ...config, withCredentials: true });
};

const signUp = (data: Register, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/signup", data, { ...config });
};

const logout = (config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get("/logout", { ...config, withCredentials: true });
};

const refreshToken = (config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/refresh-token", {}, { ...config, withCredentials: true });
};

export { login, loginWithAuth, loginWithAuthCallback, signUp, logout, refreshToken };
