export const COLUMN_PRODUCT = [
  { label: "Name", prop: "product_name", ellipsis: true, search: { el: "input" } },
  { label: "Image", prop: "product_thumb", height: 100, align: "center" },
  { label: "Description", prop: "product_description", ellipsis: true },
  { label: "Price", prop: "product_price", key: "product_price", width: 100 },
  { label: "Quantity", prop: "product_quantity", key: "product_quantity", width: 100 },
  { label: "Type", prop: "product_type", key: "product_type", search: { el: "input" }, width: 120 },
  { label: "Attributes", prop: "product_attributes", key: "product_attributes", width: 150 },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
