import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { PRODUCT } from "@/types";
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

const productApiService = BaseApiService.getInstance(axiosConfig);

const getListProduct = async (config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.get("/product", { ...config, withCredentials: true });
};

const createProduct = async (data: PRODUCT, config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.post("/product", data, { ...config });
};

const editProduct = (data: PRODUCT, id: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return productApiService.post(`/product/${id}`, data, { ...config });
};

export { getListProduct, createProduct, editProduct };
