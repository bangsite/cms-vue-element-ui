import type { Area } from "@/core/interfaces/area";

export interface Variant {
  id: string;
  product_id: string;
  title: string;
  areas: Area[];
}
