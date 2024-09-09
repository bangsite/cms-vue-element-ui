import type { PaginationApi } from "@/types";

const pagination: PaginationApi = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageCount: 0,
};

export const convertPagination = (paginationAPI: { [keys: string]: any }) => {
  pagination.currentPage = paginationAPI?.current_page || paginationAPI?.items?.current_page;
  pagination.total = paginationAPI?.total || paginationAPI?.items?.total;
  pagination.pageSize = paginationAPI?.per_page || paginationAPI?.items?.per_page;
  pagination.pageCount =
    Math.ceil(paginationAPI.total / paginationAPI?.per_page) ||
    Math.ceil(paginationAPI?.items?.total / paginationAPI?.items?.per_page);

  return pagination;
};
