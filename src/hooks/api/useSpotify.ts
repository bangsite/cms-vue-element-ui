import { reactive, ref, toRefs } from "vue";
import { getAccessToken, getAlbums, getNewRelease } from "@/services/modules/spotify.service";

import { hideFullScreenLoading, showFullScreenLoading } from "@/hooks/web/useLoadingFullSceen";

export default function useSpotify() {
  const isLoading = ref(false);
  const response = ref([]);
  const pagination = reactive({
    list: 0,
    total: 0,
    pageNum: 0,
    pageSize: 0,
  });
  const errors = ref(null);

  const track = reactive({
    limit: 8,
    offset: 1,
    country: "SE",
  });
  const getAccessTokenApp = async () => {
    isLoading.value = true;
    showFullScreenLoading();

    try {
      const { data } = await getAccessToken();
      if (data?.access_token) {
        localStorage.setItem("__at_spotify_key", `${data.token_type} ${data.access_token}`);

        await fetchNewRelease({ Authorization: `${data.token_type} ${data.access_token}` });
      }
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
      hideFullScreenLoading();
    }
  };

  const fetchListAlBums = async (config: Record<any, any>) => {
    isLoading.value = true;
    showFullScreenLoading();

    try {
      const { data } = await getAlbums("4aawyAB9vmqN3uQ7FjRGTy", { params: { ...track }, headers: { ...config } });
      response.value = data;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
      hideFullScreenLoading();
    }
  };

  const fetchNewRelease = async (config: Record<any, any>) => {
    isLoading.value = true;
    showFullScreenLoading();

    try {
      const { data } = await getNewRelease({ params: { ...track }, headers: { ...config } });
      response.value = data?.albums?.items;
      setPagination(data?.albums);
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
      hideFullScreenLoading();
    }
  };

  const setPagination = (data: Record<string, any>) => {
    if (Object.keys(data)) {
      pagination.total = data?.total || 0;
      pagination.pageNum = data?.offset || 0;
      pagination.pageSize = data?.limit || 0;
    }
  };
  return {
    getAccessTokenApp,
    fetchListAlBums,
    fetchNewRelease,

    ...toRefs({ isLoading, response, pagination, errors }),
  };
}
