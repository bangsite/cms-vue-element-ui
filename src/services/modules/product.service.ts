import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { PRODUCT } from "@/types";
import { BaseApiService } from "@/services/api.service";

const apiRootURL = import.meta.env.VITE_API_ROOT;
const apiXKey = import.meta.env.VITE_API_X_KEY;

const productApiService = BaseApiService.getInstance(apiRootURL, {
  "x-api-key": apiXKey,
});
const getListProduct = async (config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.get("/product", { ...config, withCredentials: true });
};

const createProduct = async (data: PRODUCT, config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.post("/product", data, { ...config, withCredentials: true });
};

const editProduct = (data: PRODUCT, id: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return productApiService.post(`/product/${id}`, data, { ...config, withCredentials: true });
};

export { getListProduct, createProduct, editProduct };
