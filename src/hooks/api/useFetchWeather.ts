import { ref, toRefs } from "vue";
import { getWeather } from "@/services/modules/weather.service";

export default function useFetchWeather() {
  const isLoading = ref(false);
  const response = ref(null);
  const errors = ref(null);

  const fetchDataWeather = async () => {
    isLoading.value = true;

    try {
      const { data } = await getWeather();
      response.value = data;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchDataWeather,
    ...toRefs({ isLoading, response, errors }),
  };
}
