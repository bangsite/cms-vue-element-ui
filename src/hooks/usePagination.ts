import { reactive, toRefs } from "vue";
import type { PaginationApi } from "@/types";
import { PaginationEnum } from "@/constants/pagination.constant";

type PaginationState = PaginationApi & { params: { [keyof: string]: any } };

export default function usePagination() {
  const state = reactive<PaginationState>({
    params: { ...PaginationEnum },
  });

  // Pagination & Page size
  const onPageChange = async (pagination: PaginationApi, callback: Function) => {
    if (pagination.currentPage !== state.params.page) {
      state.params.page = pagination.currentPage;
      if (typeof callback === "function") {
        await callback();
      }
    }

    if (pagination.pageSize !== state.params.pageSize) {
      state.params.page = 1;
      state.params.pageSize = pagination.pageSize;
      if (typeof callback === "function") {
        await callback();
      }
    }
  };

  return {
    ...toRefs(state),
    onPageChange,
  };
}
