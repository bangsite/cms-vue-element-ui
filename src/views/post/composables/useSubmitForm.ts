import { ref } from "vue";
import type { RouteParamValue } from "vue-router";

export const useSubmitForm = () => {
  const isLoading = ref(false);
  const response = ref([]);
  const errors = ref(null);

  const onUpdate = async (id: string | RouteParamValue[], value: Record<any, any>) => {
    isLoading.value = true;
    try {
      // call api
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const onCreate = (data: Record<any, any>) => {
    isLoading.value = true;
    try {
      // call api
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    response,
    errors,
    onCreate,
    onUpdate,
  };
};
