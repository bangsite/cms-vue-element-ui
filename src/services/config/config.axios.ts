import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_APP_ROOT_API;
const HEADER_API_KEY = import.meta.env.VITE_APP_API_KEY;
const Content_Type = "application/json";

export const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: { "Content-Type": Content_Type },
  // withCredentials: true,
  // "x-api-key": HEADER_API_KEY
};
