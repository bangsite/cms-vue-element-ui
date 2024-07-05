import type { ColumnProps } from "@/types";

export function isDefaultColumnType(item: ColumnProps): boolean {
  const defaultColumnTypes: string[] = ["selection", "radio", "index", "expand", "sort"];
  return item.type && defaultColumnTypes.includes(item.type);
}
