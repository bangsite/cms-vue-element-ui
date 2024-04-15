import type { Event } from "@/interfaces/events";

export interface SalesData {
  labels: string[];
  orders: number[];
  sales: number[];
}

export type SalesGrowthData = {
  today: SalesData;
  week: SalesData;
  month: SalesData;
};
