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
