import type { AxiosRequestConfig } from "axios";
import { BaseApiService } from "@/services/api.service";
import { ClientStorage } from "@/utils";

const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SHOP_ENDPOINT,
  headers: {
    "x-api-key": import.meta.env.VITE_SHOP_KEY,
    "x-client-id": ClientStorage.load("__user_info__").id || null,
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const mediaApiService = BaseApiService.getInstance(axiosConfig);

const listMedia = (config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.get(`/media/image`, { ...config });
};

const uploadMedia = (data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.post(`/media/image`, data, { ...config });
};

const uploadMedias = (data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.post("/media/images", data, { ...config });
};

const deleteMedia = (id: string, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.delete(`/image/${id}`, { ...config });
};

export { listMedia, uploadMedia, uploadMedias, deleteMedia };
