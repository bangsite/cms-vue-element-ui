import type { AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_APP_ROOT_API;
const HEADER_AUTH = "application/json";
const HEADER_API_KEY = import.meta.env.VITE_APP_API_KEY;

export const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: { Authorization: HEADER_AUTH, "x-api-key": HEADER_API_KEY },
  withCredentials: true,
};
