import { ref, toRefs } from "vue";
import { getTrendingAnime } from "@/services/modules/animeJikan.service";
import { hideFullScreenLoading, showFullScreenLoading } from "@/hooks/useLoadingFullSceen";
import { convertPagination } from "@/utils/convertPagination";

export default function useAnimeJikan() {
  const isLoading = ref(false);
  const response = ref([]);
  const paginationAPI = ref({});
  const errors = ref(null);

  const fetchTopAnimes = async (params: { [key: string]: any }) => {
    isLoading.value = true;
    showFullScreenLoading();

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
      hideFullScreenLoading();
    }
  };

  return {
    ...toRefs({ isLoading, response, paginationAPI, errors }),
    fetchTopAnimes,
  };
}
