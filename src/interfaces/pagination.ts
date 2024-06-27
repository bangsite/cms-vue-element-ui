export interface PaginationAPI {
  pageSize?: number;
  total?: number;
  pageCount?: number;
  pagerCount?: number;
  currentPage?: number;
  prevText?: string;
  nextText?: string;
}
