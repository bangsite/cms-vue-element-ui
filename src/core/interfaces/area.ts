import type { Images } from "@/core/interfaces/image";

export interface Locate {
  x: string | number;
  y: string | number;
  w: string | number;
  h: string | number;
  title: string;
}

export interface Area {
  id: string;
  area_type: string;
  variant_id: string;
  position: Locate[];

  file?: Images;
}
