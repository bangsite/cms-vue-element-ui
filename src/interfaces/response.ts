import type { PaginationAPI } from "@/interfaces/pagination";

export interface ResponseAPI<T> {
  data: T | Record<string, any>;
  pagination: PaginationAPI;
}
