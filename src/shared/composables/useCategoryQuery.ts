import { useQuery, type UseQueryOptions } from "vue-query";
import {
    getListCategory,
    type Category,
    getCategoryDetail,
    type CategoryDetail,
} from "@/core/services/modules/category.service";
import type { Ref } from "vue";
import type { PaginateResponse, PaginationParams } from "@/core/types/models/Common";

export const useCategoryQuery = (
    params: Ref<PaginationParams>,
    options?:
    | Omit<
        UseQueryOptions<PaginateResponse<Category>, unknown, PaginateResponse<Category>, (string | Ref<any>)[]>,
        "queryFn" | "queryKey"
      >
    | undefined
) => {
    const queryKey = ["category", params];

    return useQuery(
        queryKey,
        () =>
            getListCategory({
                page: params.value.page,
                per_page: params.value.per_page,
            }),
        {
            ...options,
        }
    );
};

export const useCategoryDetailQuery = (
    id: Ref<string>,
    options?: Omit<UseQueryOptions<CategoryDetail, unknown, CategoryDetail, string[]>, "queryFn" | "queryKey"> | undefined
) => {
    return useQuery(["categoryDetail", id as unknown as string], () => getCategoryDetail(id.value), {
        ...options,
        staleTime: 0, // 0 means always stale
    });
};
