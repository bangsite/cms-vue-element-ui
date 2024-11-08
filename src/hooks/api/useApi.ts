import { ref } from "vue";
import type { AxiosRequestConfig } from "axios";

type ApiFunction = (id?: string, data?: any, config?: AxiosRequestConfig) => Promise<any>;

export default function useApi<T>() {
  const isLoading = ref(false);
  const response = ref<T | null>(null);
  const errors = ref<any>(null);

  const handleApiCall = async (
    apiFunc: ApiFunction,
    options: {
      id?: string;
      data?: any;
      config?: AxiosRequestConfig;
      transformResponse?: (res: any) => T;
      transformError?: (error: any) => any;
    }
  ) => {
    const { id, data, config, transformResponse, transformError } = options;
    isLoading.value = true;
    errors.value = null;

    try {
      const res = await apiFunc(id, data, config);
      // response.value = res?.data?.data || res?.data || null; // Adjust as per your API response structure
      response.value = transformResponse ? transformResponse(res) : res?.data || res;
    } catch (error: any) {
      // errors.value = error.response?.data || error?.message;
      errors.value = transformError ? transformError(error) : error.response?.data || error.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    handleApiCall,
    isLoading,
    response,
    errors,
  };
}
