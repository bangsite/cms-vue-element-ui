import type { TableColumnCtx } from "element-plus";
import type { Ref, VNode } from "vue";
import type { Pagination } from "./pagination";

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
  column?: TableColumnCtx<T>;
  [key: string]: any;
};

// Extend Library
export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, "type" | "children" | "renderCell" | "renderHeader">> {
  type?: TypeProps;
  render?: any | undefined;
  tag?: boolean | Ref<boolean>;
  isShow?: boolean | Ref<boolean>;
  search?: any | undefined;
  enum?: EnumProps[] | Ref<EnumProps[]> | ((params?: any) => Promise<any>);
  isFilterEnum?: boolean | Ref<boolean>;
  fieldNames?: FieldNamesProps;
  headerRender?: (scope: HeaderRenderScope<T>) => VNode;
  _children?: ColumnProps<T>[];
}

// Custom
export interface TableColumnProps {
  prop?: string;
  label?: string;
  type?: "input" | "select" | "date" | "sort" | "selection";
  width?: number;
  showOverflowTooltip?: boolean;
  fixed?: string;
  search?: { el: string; props?: Record<string, any> };
}

export interface TableBasicProps {
  border?: boolean;
  columns: any[];
  customCols: string[];
  dataTables: any[];
  pagination?: Pagination;
  showOperations?: boolean;
  title?: string;
  rowKey?: string;
  refreshTables?: boolean;
}

export interface TableProProps {
  border?: boolean;
  columns: any[];
  customCols?: any[];
  customClass?: string;
  dataTables: any[];
  defaultSort?: { prop: string; order: "ascending" | "descending" };
  pagination?: Pagination;
  showOperations?: boolean;
  title?: string;
  rowKey?: string;
  refreshTables?: boolean;
}

export interface TableHeaderProps {
  toolButton: ("refresh" | "setting" | "search")[] | boolean;
}
