import type { ColumnProps } from "@/types";

export function isDefaultColumnType(item: ColumnProps): boolean {
  const { type } = item;
  const defaultColumnTypes: string[] = ["selection", "radio", "index", "expand", "sort"];

  if (type) return defaultColumnTypes.includes(type);
  return false;
}
