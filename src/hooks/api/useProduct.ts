import { ref, toRefs } from "vue";
import { getListProduct } from "@/services/modules/product.service";

export default function useProduct() {
  const isLoading = ref(false);
  const response = ref([]);
  const errors = ref(null);

  const fetchListProduct = async () => {
    isLoading.value = true;

    try {
      const { data } = await getListProduct();
      response.value = data?.data;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    ...toRefs({ isLoading, response, errors }),
    fetchListProduct,
  };
}
