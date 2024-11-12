import { ref } from "vue";
import { getListProduct } from "@/services/modules/product.service";
import { convertPagination } from "@/utils";
import type { Pagination } from "@/types";

export default function useProduct() {
  const isLoading = ref(false);
  const response = ref([]);
  const errors = ref(null);
  const paginationAPI = ref<Pagination>({
    page: 1,
    limit: 10,
    currentPage: 1,
    pageSize: 1,
  });

  const fetchListProduct = async (params: { [key: string]: any }) => {
    isLoading.value = true;

    try {
      const res = await getListProduct({ params: { ...params } });
      const { data, pagination } = res.data;

      response.value = data;
      paginationAPI.value = convertPagination(pagination.items);
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    response,
    paginationAPI,
    errors,
    fetchListProduct,
  };
}
