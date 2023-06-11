export interface PaginationAPI {
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  pageCount?: number;
  pagerCount?: number;
  currentPage?: number;
  defaultCurrentPage?: number;
  pageSizes?: number[];
  prevText?: string;
  nextText?: string;
}
