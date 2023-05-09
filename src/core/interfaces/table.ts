declare type Recordable<T = any, K extends string | number | symbol = string> = Record<
  K extends null | undefined ? string : K,
  T
>;

export type TableColumn = {
  field: string;
  label?: string;
  children?: TableColumn[];
} & Recordable;

export type TableSlotDefault = {
  row: Recordable;
  column: TableColumn;
  $index: number;
} & Recordable;

export interface TableSetPropsType {
  field: string;
  path: string;
  value: any;
}
