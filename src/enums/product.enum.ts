import type { TableColumnProps } from "@/types";

export const PRODUCT_SEARCH_TYPE = [
  { id: "electronic", name: "Electronic" },
  { id: "clothing", name: "Clothing" },
  { id: "smartphone", name: "Smartphone" },
  { id: "Milk", name: "Milk" },
  { id: "computer", name: "Computer" },
];

export const COLUMN_PRODUCT = [
  {
    prop: "product_name",
    label: "Name",
    width: 160,
    align: "left",
    ellipsis: true,
    search: { el: "input", label: "product_name" },
  },
  { prop: "product_thumb", label: "Image", width: 130, height: 90 },
  { prop: "product_description", label: "Description", ellipsis: true },
  { prop: "product_attributes", label: "Attributes", key: "product_attributes", width: 150 },
  {
    prop: "product_type",
    label: "Type",
    key: "product_type",
    search: { el: "select", label: "product_type" },
  },
  { prop: "product_quantity", label: "Quantity", key: "product_quantity", width: 90 },
  { prop: "product_price", label: "Price", key: "product_price" },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
