import { ref, toRefs } from "vue";
import { getWeather } from "@/services/modules/weather.service";

export default function useWorkBench() {
  const isLoading = ref(false);
  const response = ref({});
  const errors = ref(null);

  const fetchWeather = async () => {
    isLoading.value = true;

    try {
      const { data } = await getWeather();
      response.value = data;
      console.log(data);
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchWeather,
    ...toRefs({ isLoading, response, errors }),
  };
}
