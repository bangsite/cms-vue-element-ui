import type { Product, ProductTreeNode } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const PRODUCT_SEARCH_TYPE = [
  { id: "electronic", name: "Electronic" },
  { id: "clothing", name: "Clothing" },
  { id: "smartphone", name: "Smartphone" },
  { id: "milk", name: "Milk" },
  { id: "computer", name: "Computer" },
];

export const PRODUCT_FORM: Product = {
  product_name: "",
  product_thumb: "",
  product_description: "",
  product_price: 0,
  product_quantity: 0,
  product_type: "8",
  product_attributes: [
    {
      manufacturer: "",
      model: "",
      color: "",
    },
  ],
};

export const PRODUCT_CATEGORIES: ProductTreeNode[] = [
  {
    id: 1,
    label: "Electric",
    children: [
      {
        id: 3,
        label: "Computer",
      },
      {
        id: 4,
        label: "Smartphone",
      },
    ],
  },
  {
    id: 2,
    label: "Clothing",
    children: [
      {
        id: 5,
        label: "T-shirt",
      },
      {
        id: 6,
        label: "Hat",
      },
    ],
  },
];

export const PRODUCT_TAGS = [
  { id: uuidv4(), name: "laptop" },
  { id: uuidv4(), name: "electric" },
  { id: uuidv4(), name: "tivi" },
  { id: uuidv4(), name: "smartphone" },
  { id: uuidv4(), name: "book" },
];

export const PRODUCT_COLUMN = [
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
