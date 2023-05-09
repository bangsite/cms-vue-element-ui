import type { AxiosRequestConfig } from "axios";

export const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_ROOT_API,
  headers: {
    Authorization: "application/json",
  },
};
