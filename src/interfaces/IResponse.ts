import type { PaginationAPI } from "@/interfaces/IPagination";

export interface ResponseAPI<T> {
  data: T | Record<string, any>;
  pagination: PaginationAPI;
}
