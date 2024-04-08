import ApiService from "@/core/services/api.service";
import type { ResponseAPI } from "@/config/interfaces/response";

export const listProduct = (config?: Record<string, any>) => {
  return ApiService.get<ResponseAPI<[]>>(`/products`, { ...config }).then((response) => response.data);
};

export const detailProduct = (id: string, config?: Record<string, any>) => {
  return ApiService.get<ResponseAPI<[]>>(`/products/${id}`, { ...config }).then((response) => response.data);
};

export const createProduct = (data: FormData, config?: Record<string, any>) => {
  return ApiService.post<ResponseAPI<[]>>(`/products`, data, { ...config }).then((response) => response.data);
};

export const updateProduct = (id: string, data: FormData, config?: Record<string, any>) => {
  return ApiService.post<ResponseAPI<[]>>(`/products/${id}`, data, {
    params: { _method: "PUT" },
    ...config,
  }).then((response) => response.data);
};

export const deleteProduct = (id: string, config?: Record<string, any>) => {
  return ApiService.delete(`/products/${id}`, { ...config }).then((response) => response.data);
};
