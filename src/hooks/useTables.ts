import { reactive, ref } from "vue";
import type { Pagination } from "@/types";

interface Params {
  filter?: string;
  sort?: string;
  orderBy?: string;
}

export default function useTables(
  fetchData?: (params: Record<string, any>) => Promise<void>,
  defaultParams?: Params,
  defaultSearchParams?: Record<string, any>,
  defaultPaginationParams?: Pagination
) {
  const isRefreshTable = ref(false);
  const searchParams = reactive<Record<string, any>>(defaultSearchParams || {});
  const paginationParams = reactive<Pagination>({
    ...defaultPaginationParams,
  });

  const params = reactive<Params>({
    ...defaultParams,
  });

  const resetParams = () => {
    Object.assign(params, { ...defaultParams });
    Object.assign(searchParams, {});
    Object.assign(paginationParams, {});

    paginationParams.page = 1;
    paginationParams.limit = 10;
    paginationParams.currentPage = 1;
    paginationParams.pageSize = 10;
  };

  const onSearch = async (newSearchParams: Record<string, any>) => {
    Object.assign(searchParams, newSearchParams);
    paginationParams.page = 1;
    paginationParams.currentPage = 1;

    if (fetchData) {
      await fetchData({ ...params, ...searchParams, ...paginationParams });
    }
  };

  const onResetSearch = async () => {
    resetParams();
    if (fetchData) {
      await fetchData({ ...params, ...paginationParams });
    }
  };

  const onRefreshTable = async () => {
    isRefreshTable.value = true;
    resetParams();
    if (fetchData) {
      await fetchData({ ...params, ...paginationParams });
    }
    isRefreshTable.value = false;
  };

  const onPaginationChange = async (data: Record<string, any>) => {
    if (data.currentPage) {
      paginationParams.currentPage = data.currentPage;
      paginationParams.page = data.currentPage;
    }
    if (data.pageSize) {
      paginationParams.pageSize = data.pageSize;
      paginationParams.limit = data.pageSize;
    }
    if (fetchData) {
      await fetchData({ ...params, ...searchParams, ...paginationParams });
    }
  };

  const onSortChange = async (sortNew: string, orderByNew: string = "desc") => {
    params.sort = sortNew;
    params.orderBy = orderByNew;

    if (fetchData) {
      await fetchData({ ...params, ...searchParams, ...paginationParams });
    }
  };

  const onDownloadCSV = async () => {
    // Implement CSV download logic here
  };

  return {
    params,
    paginationParams,
    searchParams,
    isRefreshTable,
    onSearch,
    onResetSearch,
    onRefreshTable,
    onPaginationChange,
    onSortChange,
    onDownloadCSV,
  };
}
