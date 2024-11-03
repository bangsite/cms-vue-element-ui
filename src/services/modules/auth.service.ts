import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Login, Register } from "@/types";
import { BaseApiService } from "@/services/api.service";

const apiRootURL = import.meta.env.VITE_SHOP_ENDPOINT;
const apiXKey = import.meta.env.VITE_SHOP_KEY;
console.log(apiXKey);
// const authApiService = BaseApiService.getInstance(apiRootURL, {
//   "x-api-key": apiXKey,
// });

const auth2ApiService = BaseApiService.getInstance("http://localhost:3000/v1/api", {
  "x-api-key": apiXKey,
});

const loginWithAuth = (provider: string, config?: AxiosRequestConfig): Promise<any> => {
  return auth2ApiService.get(`auth/${provider}`, { ...config });
};

const loginWithAuthCallback = (provider: string, config?: AxiosRequestConfig): Promise<any> => {
  return auth2ApiService.get(`auth/${provider}/callback`, {
    ...config,
    withCredentials: true,
  });
};

const login = (data: Login, config?: AxiosRequestConfig): Promise<any> => {
  return auth2ApiService.post("/login", data, { ...config, withCredentials: true });
};

const signUp = (data: Register, config?: AxiosRequestConfig): Promise<any> => {
  return auth2ApiService.post("/signup", data, { ...config });
};

const logout = (config = {}): Promise<AxiosResponse> => {
  return auth2ApiService.get("/logout", { ...config, withCredentials: true });
};

const refreshToken = (config = {}): Promise<AxiosResponse> => {
  return auth2ApiService.get("/refresh-token", { ...config, withCredentials: true });
};

export { login, loginWithAuth, loginWithAuthCallback, signUp, logout, refreshToken };
