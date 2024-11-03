import type { AxiosRequestConfig } from "axios";
import { BaseApiService } from "@/services/api.service";
import { ClientStorage } from "@/utils";

const apiRootURL = import.meta.env.VITE_SHOP_ENDPOINT;
const apiXKey = import.meta.env.VITE_SHOP_KEY;
const clientId = ClientStorage.load("__user_info__").id;

const mediaApiService = BaseApiService.getInstance("http://localhost:3000/v1/api", {
  "x-api-key": apiXKey,
  "x-client-id": clientId,
});

const listMedia = (config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.get(`media/`, { ...config, withCredentials: true });
};

const uploadMedia = (data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.post(`media/upload`, data, {
    ...config,
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const uploadMedias = (data: Record<string, any>, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.post("/media/uploads", data, {
    ...config,
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const deleteMedia = (id: string, config?: AxiosRequestConfig): Promise<any> => {
  return mediaApiService.delete(`/media/${id}`, { ...config, withCredentials: true });
};

export { listMedia, uploadMedia, uploadMedias, deleteMedia };
