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
