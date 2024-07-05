import type { PRODUCT } from "@/types";

export const PRODUCT_FORM: PRODUCT = {
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
