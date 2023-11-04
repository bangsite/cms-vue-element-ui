import { ref } from "vue";
import { getTables } from "@/services/modules/tables.service";
import { convertPagination } from "@/utils/convertPagination";
import { onLoading } from "@/hooks/web/useLoading";

export default function useFetchData() {
  const dataList = ref(null);
  const pagination = ref({});

  const fetchListHotel = async (params: any) => {
    onLoading("start");
    try {
      const result = await getTables({ ...params });

      if (result) {
        dataList.value = result;
        pagination.value = convertPagination(result?.pagination || {}, "");
        console.log();
      }

      onLoading("end");
    } catch (err) {
      onLoading("end");
      console.log(err);
    }
  };

  return {
    dataList,
    pagination,
    fetchListHotel,
  };
}
