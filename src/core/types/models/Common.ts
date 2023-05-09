export type PaginationParams = {
  page: number;
  per_page: number;
};

export type PaginateResponse<T> = {
  data: T[];
  pagination: {
    count: number;
    total: number;
    perPage: number;
    currentPage: number;
  };
};
