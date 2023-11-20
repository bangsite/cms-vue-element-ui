import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/services/config/interceptors.axios";
import { formatJsonToUrlParams } from "@/utils/formatJson";

const ApiService = {
  get<T = any>(url: string, config: AxiosRequestConfig) {
    return axiosInstance.get<T>(`${url}`, { ...config });
  },

  post<T = unknown>(url: string, data: Record<string, any> | [] | any, config: AxiosRequestConfig) {
    return axiosInstance.post<T>(`${url}`, data, config);
  },

  put<T = unknown>(url: string, data: Record<string, any> | [], config: AxiosRequestConfig) {
    return axiosInstance.put<T>(`${url}`, data, config);
  },

  patch<T = unknown>(url: string, data: Record<string, any> | [], config: AxiosRequestConfig) {
    return axiosInstance.patch<T>(`${url}`, data, config);
  },

  delete(url: string, config: AxiosRequestConfig) {
    return axiosInstance.delete(`${url}`, config);
  },

  postWithFile<T = unknown>(url: string, file: File, config: AxiosRequestConfig) {
    return axiosInstance.post<T>(url, file, {
      ...config,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  downloadWithFile(url: string, data: Record<string, any> | []) {
    window.location.href = `${import.meta.env.VUE_APP_ROOT_API}/${url}?${formatJsonToUrlParams(data)}`;
  },
};

export default ApiService;
