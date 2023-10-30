import ElPagination from "element-plus/lib/components/pagination";
import type { PaginationAPI } from "@/core/interfaces/pagination.interface";
import { i18n } from "@/plugins/i18n";

const pagination = { ...ElPagination };

pagination.defaultCurrentPage = 1;
pagination.defaultPageSize = 50;

export const convertPagination = (paginationAPI: PaginationAPI) => {
  pagination.current = paginationAPI?.currentPage ? parseInt(paginationAPI.currentPage) : pagination.defaultCurrentPage;
  pagination.total = paginationAPI?.total ? parseInt(paginationAPI.total) : 0;
  pagination.pageSize = paginationAPI?.pageSize ? parseInt(paginationAPI.pageSize) : pagination.defaultPageSize;
  pagination.pageCount = paginationAPI.total ? parseInt(paginationAPI.total) : 0;
  pagination.showSizeChanger = true;
  pagination.locale = { items_per_page: "" };
  pagination.showTotal = (total: number, range: [number, number]) => {
    return `${i18n.global.t("PAGINATION.TOTAL", {
      range1: range[0],
      range2: range[1],
      total: total,
    })}`;
  };
  pagination.position = ["topRight", "bottomRight"];

  return pagination;
};