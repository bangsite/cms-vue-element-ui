import type { Pagination } from "@/types";
import { convertKeysToCamelCase } from "@/utils/fortmatString";

const pagination: Pagination = {
  currentPage: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
};

const calPageCount = (total: number, pageSize: number) => {
  if (!total) return 0;

  return Math.ceil(total / pageSize);
};

export const convertPagination = (data: { [keys: string]: any }) => {
  const dataNew = convertKeysToCamelCase(data);

  pagination.currentPage = dataNew?.currentPage || 1;
  pagination.total = dataNew.total || 0;
  pagination.pageSize = dataNew?.pageSize || dataNew?.perPage || 10;
  pagination.pageCount = dataNew?.pageCount ? dataNew?.pageCount : calPageCount(pagination.total, pagination.pageSize);

  return pagination;
};
