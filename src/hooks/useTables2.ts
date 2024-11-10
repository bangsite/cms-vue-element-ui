import { reactive, ref } from "vue";
import type { Pagination } from "@/types";
import { COLUMN_ANIME } from "@/views/table/composables/useColumnAnime";

interface Params {
  filter?: string;
  sort?: string;
  orderBy?: string;
}

export default function useTables2(
  fetchData: (params: Record<string, any>) => Promise<void>,
  defaultParams?: Params = {},
  defaultSearchParams?: Record<string, any> = {},
  defaultPaginationParams?: Pagination = {}
) {
  const defaultColumns = reactive([...COLUMN_ANIME]);
  const columns = ref([...defaultColumns]);
  const isRefreshTable = ref(false);
  const searchParams = reactive<Record<string, any>>(defaultSearchParams || {});
  const paginationParams = reactive<Pagination>({
    page: 1,
    limit: 10,
    currentPage: 1,
    pageSize: 1,
    ...defaultPaginationParams,
  });

  const params = reactive<Params>({
    filter: "",
    sort: "desc",
    orderBy: "",
    ...defaultParams,
  });

  const resetColumn = () => {
    columns.value = [...defaultColumns];
  };
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

    await fetchData({ ...params, ...searchParams, ...paginationParams });
  };

  const onResetSearch = async () => {
    resetParams();
    await fetchData({ ...params, ...paginationParams });
  };

  const onRefreshTable = async () => {
    isRefreshTable.value = true;
    resetParams();
    resetColumn();
    await fetchData({ ...params, ...paginationParams });
    isRefreshTable.value = false;
  };

  const onPaginationChange = async (data: Record<string, any>) => {
    if (data.currentPage) {
      paginationParams.currentPage = data.currentPage;
      paginationParams.page = data.currentPage;
    }
    if (data.pageSize) {
      paginationParams.pageSize = data.pageSize;
    }

    await fetchData({ ...params, ...searchParams, ...paginationParams });
  };

  const onSortChange = async (sortNew: string, orderByNew: string = "desc") => {
    params.sort = sortNew;
    params.orderBy = orderByNew;
    await fetchData({ ...params, ...searchParams, ...paginationParams });
  };

  const onDownloadCSV = async () => {};

  return {
    columns,
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
