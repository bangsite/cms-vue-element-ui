import { reactive, toRefs } from "vue";
import { PaginationEnum } from "@/enums/pagination.enum";

export default function usePagination() {
  const state = reactive({
    params: { ...PaginationEnum },
  });

  // Pagination & Page size
  const onPageChange = async (pagination, callback) => {
    if (pagination.current !== state.params.page) {
      state.params.page = pagination.current;
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
