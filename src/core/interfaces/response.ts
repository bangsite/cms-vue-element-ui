import type { PaginationAPI } from "@/core/interfaces/pagination.interface";

export interface ResponseAPI<T> {
  data: T | Record<string, any>;
  pagination: PaginationAPI;
}
