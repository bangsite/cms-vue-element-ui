export interface Sorter {
  columnKey: string;
  order: "ascend" | "descend" | null;
}

export interface SorterState {
  orderBy: {
    sort?: string;
  };
}
