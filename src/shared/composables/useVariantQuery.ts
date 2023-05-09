import { useQuery, useMutation, useQueryClient } from "vue-query";
import {
  listVariants,
  deleteVariants,
  createVariants,
  updateVariants,
  detailVariants,
} from "@/core/services/modules/variant.service";

export const useListVariant = (id: string, params: Record<string, any>) => {
  console.log(params);
  const queryKey = ["VariantList", params];
  const queryFunc = async () => await listVariants(id, { ...params });

  return useQuery(queryKey, queryFunc);
};

export const useDetailVariant = (idProduct: string, idVariant: string, params: Record<string, string>) => {
  const queryKey = ["DetailVariant", params];

  return useQuery(queryKey, () => detailVariants(idProduct, idVariant, { ...params }));
};

export const useUpdateVariant = (idProduct: string, idVariant: string, params: Record<string, string> = {}) => {
  // const queryKey = ['UpdateVariant', params];
  const queryFunc = async (data: Record<string, string>) =>
    await updateVariants(idProduct, idVariant, data, { ...params });

  return useMutation(queryFunc);
};

export const useCreateVariant = (data: Record<string, any>) => {
  const queryFunc = async () => await createVariants(data.id, data.data, { ...data.params });
  const queryClient = useQueryClient();

  useMutation(queryFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries(["ListVariant"]).then();
    },
  });

  // return useMutation(queryFunc);
};

export const useDeleteVariant = (idProduct: string, idVariant: string, params: Record<string, string>) => {
  const queryKey = ["DeleteVariant", params];

  return useMutation(queryKey, () => deleteVariants(idProduct, idVariant, { ...params }));
};
