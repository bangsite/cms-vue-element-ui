export interface Pagination {
  [key: string]: any;
  currentPage: number;
  pageSize: number;
  total: number;
  pageCount?: number;
  prevText?: string;
  nextText?: string;
}
