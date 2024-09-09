export type FilterParams = Record<string, any>;

export interface UseFilterListState {
  filterParams: FilterParams;
  dateFields: string[];
}
