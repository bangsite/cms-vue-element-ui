export interface SearchColumn {
  prop?: string;
  label?: string;
  type?: "input" | "select" | "date" | "sort" | "selection";
  width?: number;
  showOverflowTooltip?: boolean;
  fixed?: string;
  search?: { el: string; props?: Record<string, any> };
  placeholder?: string;
}

export interface SearchProps {
  labelPosition?: string;
  searchTitle?: string;
  searchColumns?: SearchColumn[];
  searchParam?: { [key: string]: any };
  searchCol?: number;
  searchSelectData?: { [key: string]: { id: string; name: string }[] };
}
