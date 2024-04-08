import type { AxiosRequestConfig } from "axios";

export const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_ROOT_API,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
  // "x-api-key": HEADER_API_KEY
};
