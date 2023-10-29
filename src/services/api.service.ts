import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios/interceptors.axios";
import { formatJsonToUrlParams } from "@/utils/formatJson";

const ApiService = {
  get<T = any>(url: string, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.get<T>(`${url}`, { ...config });
  },

  post<T = unknown>(url: string, data: any, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.post<T>(`${url}`, data, config);
  },

  put<T = unknown>(url: string, data: any, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.put(`${url}`, data, config);
  },

  patch<T = unknown>(url: string, data: any, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.patch(`${url}`, data, config);
  },

  delete(url: string, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.delete(`${url}`, config);
  },

  uploadCSV<T = unknown>(url: string, file: File, config: AxiosRequestConfig<any> | undefined) {
    return axiosInstance.post(url, file, {
      ...config,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  downloadCSV<T = unknown>(url: string, data: any) {
    window.location.href = `${import.meta.env.VUE_APP_ROOT_API}/${url}?${formatJsonToUrlParams(data)}`;
  },
};

export default ApiService;
