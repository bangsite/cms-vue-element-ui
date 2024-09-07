export interface IChartJS {
  type: string;
  className?: string;
  id?: string;
  style?: Record<string, string>;
  labels: string[];
  height: number;
  scales: Record<string, any>;
  datasets: Record<string, any>[];
  layout?: Record<string, any>;
  legend?: Record<string, any>;
  elements?: Record<string, any>;
  options?: Record<string, any>;
  tooltip: Record<string, any>;
}

export interface IChartSaleReport {
  data: Record<string, any>;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  backgroundColor: any;
  label: string;
  pointStyle: string;
  pointRadius: string;
  hoverRadius: string;
  pointBorderColor: string;
  pointBackgroundColor: string;
  hoverBorderWidth: number;
  amount: string;
  amountClass: string;
  growthStatus: string;
  labelType: string;
  growthRate: string;
  lineTension: number;
}
