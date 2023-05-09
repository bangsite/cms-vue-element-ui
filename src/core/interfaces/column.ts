import type { ColumnsType } from "ant-design-vue/es/table";
import type { DataIndex } from "ant-design-vue/es/vc-table/interface";

export type ColumnType<T> = ColumnsType<T>[number];

export type TableColumn = {
  dataIndex?: keyof ColumnKeyFlagType | Omit<DataIndex, string>;
  searchField?: string;
  hideInSearch?: boolean;
  hideInTable?: boolean;
};

export enum ColumnKeyFlag {
  ACTION = "ACTION",
  INDEX = "INDEX",
}
export type ColumnKeyFlagType = `${ColumnKeyFlag}`;
