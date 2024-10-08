export interface SalesGrowthDataset {
  barThickness: number;
  backgroundColor: string;
  total: string;
  growthStatus: string;
  data: any[];
  growthRate: string;
  hoverBackgroundColor: string;
  maxBarThickness: number;
  labelType: string;
  label: string;
}

export type SalesGrowthData = {
  today?: SalesData;
  week?: SalesData;
  month?: SalesData;
} & { [key: string]: SalesData };

export interface SalesData {
  labels: string[];
  orders: number[];
  sales: number[];
}

export interface ITechnology {
  id: number;
  name: string;
  description: string;
  author: string;
  site: string;
  icon: string;
  color?: string;
}

export interface IActivity {
  id: number;
  content: string;
  time: string;
}

export interface IShortcut {
  id: number;
  label: string;
  icon: string;
  color?: string;
}
