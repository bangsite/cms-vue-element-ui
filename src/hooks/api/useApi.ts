import { ref } from "vue";

export default function useApi() {
  const isLoading = ref(false);
  const response = ref<any>(null);
  const errors = ref<any>(null);

  const handleApiCall = async (apiFunc: Function, data?: any) => {
    isLoading.value = true;
    errors.value = null;

    try {
      const res = await apiFunc(data);
      response.value = res?.data || res; // Adjust as per your API response structure
    } catch (error: any) {
      errors.value = error.response?.data || error.message;
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
