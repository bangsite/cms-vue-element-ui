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
