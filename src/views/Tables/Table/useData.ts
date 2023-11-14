import { ref } from "vue";
import { getTables } from "@/services/modules/tables.service";
import { convertPagination } from "@/utils/convertPagination";
import { onLoading } from "@/hooks/web/useLoading";
import { hideFullScreenLoading, showFullScreenLoading } from "@/hooks/web/useLoadingFullSceen";

export default function useFetchData() {
  const dataList = ref(null);
  const pagination = ref({});

  const fetchListHotel = async (params: any) => {
    showFullScreenLoading();
    try {
      const result = await getTables({ ...params });

      if (result) {
        dataList.value = result;
        pagination.value = convertPagination(result?.pagination || {}, "");
        console.log();
      }

      hideFullScreenLoading();
    } catch (err) {
      hideFullScreenLoading();
      console.log(err);
    }
  };

  return {
    dataList,
    pagination,
    fetchListHotel,
  };
}
