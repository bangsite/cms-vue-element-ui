export type PRODUCT = {
  product_name: string;
  product_thumb: string;
  product_description: string;
  product_price: number;
  product_quantity: number;
  product_type: string;
  product_attributes: PRODUCT_ATTRIBUTES[];
};

export type PRODUCT_ATTRIBUTES = {
  manufacturer: string;
  model: string;
  color: string;
};

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
