import { reactive, toRefs } from "vue";
import { PaginationEnum } from "@/enums/pagination.enum";

export default function usePagination() {
  const state = reactive({
    params: { ...PaginationEnum },
  });

  // Pagination & Page size
  const onPageChange = async (pagination: { current: number; pageSize: number }, callback: () => any) => {
    if (pagination.current !== state.params.page) {
      state.params.page = pagination.current;
      if (typeof callback === "function") {
        await callback();
      }
    }

    if (pagination.pageSize !== state.params.per_page) {
      state.params.page = 1;
      state.params.per_page = pagination.pageSize;
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
