import { ref, toRefs } from "vue";
import { getHotels } from "@/services/modules/booking.service";

export default function useBooking() {
  const isLoading = ref(false);
  const response = ref([]);
  const errors = ref(null);

  const fetchListHotels = async (payload: Record<string, any> = {}) => {
    isLoading.value = true;

    try {
      const res = await getHotels(payload);
      response.value = res?.data?.result;
    } catch (error) {
      const { data } = error as any;
      errors.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    fetchListHotels,
    ...toRefs({ isLoading, response, errors }),
  };
}
