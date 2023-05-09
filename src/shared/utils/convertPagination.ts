import PaginationProps from "ant-design-vue/lib/pagination";
import type { PaginationAPI } from "@/core/interfaces/pagination";
import { i18n } from "@/plugins/i18n";

const pagination = { ...PaginationProps };

pagination.defaultCurrent = 1;
pagination.defaultPageSize = 50;

export const convertPagination = (paginationAPI: PaginationAPI) => {
  pagination.current = paginationAPI?.currentPage ? parseInt(paginationAPI.currentPage) : pagination.defaultCurrent;
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
