import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { PRODUCT } from "@/types";
import { BaseApiService } from "@/services/api.service";

const apiRootURL = import.meta.env.VITE_API_ROOT;
const apiXKey = import.meta.env.VITE_API_X_KEY;

const productApiService = BaseApiService.getInstance(apiRootURL, {
  "x-api-key": apiXKey,
});
const getListProduct = async (config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.get("/product", { ...config });
};

const createProduct = async (data: PRODUCT, config?: AxiosRequestConfig): Promise<any> => {
  return await productApiService.post("/product", data, { ...config });
};

const editProduct = (data: PRODUCT, id: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return productApiService.post(`/product/${id}`, data, { ...config });
};

export { getListProduct, createProduct, editProduct };
