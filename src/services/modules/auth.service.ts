import type { AxiosRequestConfig, AxiosResponse } from "axios";
import ApiService from "../api.service";

const login = async (data: Auth.Login, config?: AxiosRequestConfig): Promise<any> => {
  return await ApiService.post("/login", data, { ...config });
};

const signUp = async (data: Auth.Register, config?: AxiosRequestConfig): Promise<any> => {
  return await ApiService.post("/signup", data, { ...config });
};
const logout = (config = {}): Promise<AxiosResponse> => {
  return ApiService.get("/logout", config);
};

export { login, signUp, logout };
