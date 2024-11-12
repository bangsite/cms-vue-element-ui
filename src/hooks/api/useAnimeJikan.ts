import { ref } from "vue";
import { getTrendingAnime } from "@/services/modules/animeJikan.service";
import { convertPagination } from "@/utils/convertPagination";
import type { Pagination } from "@/types";

export default function useAnimeJikan() {
  const isLoading = ref(false);
  const response = ref([]);
  const errors = ref(null);
  const paginationAPI = ref<Pagination>({
    page: 1,
    limit: 10,
    currentPage: 1,
    pageSize: 1,
    total: 0,
  });

  const fetchTopAnimes = async (params: { [key: string]: any }) => {
    isLoading.value = true;

    try {
      const res = await getTrendingAnime({ params: { ...params } });
      const { data, pagination } = res.data;

      response.value = data;
      paginationAPI.value = convertPagination(pagination);
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
    fetchTopAnimes,
  };
}
