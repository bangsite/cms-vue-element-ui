import { reactive, ref, toRefs } from "vue";
import { getTrendingAnime } from "@/services/modules/animeJikan.service";
import { hideFullScreenLoading, showFullScreenLoading } from "@/hooks/event/useLoadingFullSceen";

export default function useAnimeJikan() {
  const isLoading = ref(false);
  const response = ref([]);
  const pagination = reactive({
    pageNum: 0,
    pageSize: 0,
    total: 0,
  });
  const errors = ref(null);

  const fetchTopAnimes = async () => {
    isLoading.value = true;
    showFullScreenLoading();

    try {
      const res = await getTrendingAnime({ params: { page: 5, limit: 10 } });
      const { data, pagination } = res.data;

      response.value = data;

      pagination.value.total = pagination?.items.total;
      pagination.value.pageSize = pagination?.items.per_page;
      pagination.value.pageNum = pagination?.items.count;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
      hideFullScreenLoading();
    }
  };

  return {
    fetchTopAnimes,

    ...toRefs({ isLoading, response, pagination, errors }),
  };
}
