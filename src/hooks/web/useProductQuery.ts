import { useQuery, useMutation } from "vue-query";
import {
  listProduct,
  detailProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/modules/product.service";

export const useListProduct = (params: Record<string, any>) => {
  const queryKey = ["ListProduct", params];
  const queryFunc = async () => await listProduct({ ...params });

  return useQuery(queryKey, queryFunc);
};

export const useDetailProduct = (idProduct: string, params: Record<string, any>) => {
  const queryKey = ["DetailProduct", params];

  return useQuery(queryKey, () => detailProduct(idProduct, { ...params }));
};

export const useUpdateProduct = (idProduct: string, params: Record<string, any> = {}) => {
  const queryKey = ["UpdateProduct", params];
  const queryFunc = async (data: FormData) => await updateProduct(idProduct, data, { ...params });

  return useMutation(queryKey, queryFunc);
};

export const useCreateProduct = (data: FormData, params: Record<string, any>) => {
  const queryKey = ["CreateProduct", params];
  const queryFunc = async () => await createProduct(data, { ...params });

  return useMutation(queryKey, queryFunc);
};

export const useDeleteProduct = (idProduct: string, params: Record<string, any>) => {
  const queryKey = ["DeleteProduct", params];

  return useMutation(queryKey, () => deleteProduct(idProduct, { ...params }));
};
