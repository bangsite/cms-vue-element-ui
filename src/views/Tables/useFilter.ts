import { ref } from "vue";

export default function useFilter() {
  const params = ref({
    page: 0,
  });

  const clearFilters = () => {};

  return {
    params,
    clearFilters,
  };
}
