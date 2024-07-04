import type { TableColumnCtx } from "element-plus";
import type { Ref, VNode } from "vue";
import type { PaginationAPI } from "@/interfaces/IPagination";

export interface EnumProps {
  label?: string;
  value?: string | number | boolean | any[];
  disabled?: boolean;
  tagType?: string;
  children?: EnumProps[];

  [key: string]: any;
}

export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

export type HeaderRenderScope<T> = {
  $index: number;
  // column: TableColumnCtx<T>;
  [key: string]: any;
};

export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
  type?: TypeProps;
  tag?: boolean | Ref<boolean>;
  isShow?: boolean | Ref<boolean>;
  search?: any | undefined;
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>);
  isFilterEnum?: boolean | Ref<boolean>;
  fieldNames?: FieldNamesProps;
  headerRender?: (scope: HeaderRenderScope<T>) => VNode;
  _children?: ColumnProps<T>[];
}

export interface TableBasicProps {
  columns: any[];
  customCols: string[];
  dataTables: any[];
  title?: string;
  pagination?: Record<string, any>;
  showOperations?: boolean;
  initParam?: any;
  border?: boolean;
  toolButton?: ("refresh" | "setting" | "search")[] | boolean;
  rowKey?: string;
}

export interface TableProProps {
  columns: any[];
  customCols?: any[];
  customClass?: string;
  dataTables: any[];
  rowKey?: string;
  pagination?: PaginationAPI;
  border?: boolean;
  defaultSort?: { prop: string; order: "ascending" | "descending" };
  title?: string;
}

export interface TableHeaderProps {
  toolButton: ("refresh" | "setting" | "search")[] | boolean;
}
