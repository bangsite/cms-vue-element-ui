import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Login, Register } from "@/types";
import { BaseApiService } from "@/services/api.service";

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SHOP_ENDPOINT,
  headers: {
    "x-api-key": import.meta.env.VITE_SHOP_KEY,
  },
  withCredentials: true,
};

const authApiService = BaseApiService.getInstance(axiosConfig);

const loginWithAuth = (provider: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get(`auth/${provider}`, { ...config });
};

const loginWithAuthCallback = (provider: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get(`auth/${provider}/callback`, { ...config });
};

const login = (data: Login, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/login", data, { ...config, withCredentials: true });
};

const signUp = (data: Register, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/signup", data, { ...config });
};

const logout = (config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.get("/logout", { ...config });
};

const refreshToken = (config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return authApiService.post("/refresh-token", {}, { ...config });
};

export { login, loginWithAuth, loginWithAuthCallback, signUp, logout, refreshToken };
