import { useQuery, type UseQueryOptions } from "vue-query";
import { getListOrders, type PaginationParams } from "@/core/services/modules/order.service";
import type { Ref } from "vue";
import type { PaginateResponse } from "@/core/services/modules/category.service";

export const useGetListOrders = (
  params?: Ref<PaginationParams>,
  options?:
    | Omit<
        UseQueryOptions<
          PaginateResponse<any>,
          unknown,
          PaginateResponse<any>,
          (string | Ref<PaginationParams> | undefined)[]
        >,
        "queryFn" | "queryKey"
      >
    | undefined
) => {
  return useQuery(
    ["orders", params],
    () => {
      return getListOrders(params?.value);
    },
    options
  );
};
