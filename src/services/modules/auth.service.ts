import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiService } from "../api.service";
import type { Login, Register } from "@/types";

const apiRootURL = import.meta.env.VITE_API_ROOT;
const apiXKey = import.meta.env.VITE_API_X_KEY;

const shopApiService = new BaseApiService(apiRootURL, {
  "x-api-key": apiXKey,
});
const login = async (data: Login, config?: AxiosRequestConfig): Promise<any> => {
  return await shopApiService.post("/login", data, { ...config });
};

const signUp = async (data: Register, config?: AxiosRequestConfig): Promise<any> => {
  return await shopApiService.post("/signup", data, { ...config });
};

const logout = (config = {}): Promise<AxiosResponse> => {
  return shopApiService.get("/logout", { ...config });
};

export { login, signUp, logout };
