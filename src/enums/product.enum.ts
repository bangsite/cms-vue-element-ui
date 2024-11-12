import type { TableColumnProps } from "@/types";

export const PRODUCT_SEARCH_TYPE = [
  { id: "electronic", name: "Electronic" },
  { id: "clothing", name: "Clothing" },
  { id: "smartphone", name: "Smartphone" },
  { id: "Milk", name: "Milk" },
  { id: "computer", name: "Computer" },
];

export const COLUMN_PRODUCT: TableColumnProps[] = [
  { prop: "product_name", label: "Name", align: "left", ellipsis: true, search: { el: "input" } },
  { prop: "product_thumb", label: "Image", width: 130, height: 90 },
  { prop: "product_description", label: "Description", ellipsis: true },
  { prop: "product_attributes", label: "Attributes", key: "product_attributes", width: 150 },

  {
    prop: "product_type",
    label: "Type",
    key: "product_type",
    search: { el: "select", label: "product_type" },
    width: 120,
  },
  { prop: "product_quantity", label: "Quantity", key: "product_quantity", width: 100 },
  { prop: "product_price", label: "Price", key: "product_price", width: 100 },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
