import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
// import { i18n } from "@/plugins/vue-i18n";

export const setAuthorizationHeader = (
  config: AxiosRequestConfig | InternalAxiosRequestConfig,
  token: string
): AxiosRequestConfig | InternalAxiosRequestConfig => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Accept-Language
  // if (i18n?.global?.locale) {
  //   config.headers = { ...config.headers, "Accept-Language": i18n.global.locale };
  // }

  // Content-Type
  if (config.data instanceof FormData) {
    config.headers = { ...config.headers, "Content-Type": "multipart/form-data" };
  }

  return config;
};
