import ApiService from "@/core/services/api.service";
import type { ResponseAPI } from "@/config/interfaces/response";

export const listVariants = (id: string, config?: Record<string, string>) => {
  return ApiService.get<ResponseAPI<[]>>(`/products/${id}/variants`, { ...config }).then((response) => response.data);
};

export const detailVariants = (idProduct: string, idVariants: string, config?: Record<string, string>) => {
  return ApiService.get<ResponseAPI<[]>>(`/products/${idProduct}/variants/${idVariants}`, { ...config }).then(
    (response) => response.data
  );
};

export const createVariants = (id: string, data: Record<string, string>, config?: Record<string, string>) => {
  return ApiService.post<ResponseAPI<[]>>(`/products/${id}/variants`, data, { ...config }).then(
    (response) => response.data
  );
};

export const updateVariants = (
  idProduct: string,
  idVariants: string,
  data: Record<string, string>,
  config?: Record<string, string>
) => {
  return ApiService.put<Omit<ResponseAPI<{}>, "pagination">>(`/products/${idProduct}/variants/${idVariants}`, data, {
    ...config,
  }).then((response) => response.data);
};

export const deleteVariants = (idProduct: string, idVariants: string, config?: Record<string, string>) => {
  return ApiService.delete(`/products/${idProduct}/variants/${idVariants}`, { ...config }).then(
    (response) => response.data
  );
};
