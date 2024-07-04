import { chartLinearGradient } from "@/utils/chartUtilities";

export const SALES_REPORT_DATA = {
  title: "Sales Report",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  orders: [10, 55, 42, 30, 42, 80, 35, 10, 53, 62, 45, 78],
  sales: [30, 45, 35, 10, 5, 60, 8, 42, 30, 70, 54, 25],
  total: "8,550",
  growthRate: "25.36",
  growthStatus: "down",
};

export const salesRevenueDatasets = (element: HTMLElement) => [
  {
    data: SALES_REPORT_DATA.orders,
    borderColor: "#8231D3",
    borderWidth: 3,
    fill: true,
    backgroundColor: () =>
      chartLinearGradient(element, 300, {
        start: "transparent",
        end: "transparent",
      }),
    label: "Orders",
    pointStyle: "circle",
    pointRadius: "0",
    hoverRadius: "5",
    pointBorderColor: "transparent",
    pointBackgroundColor: "#8231D3",
    hoverBorderWidth: 5,
    amount: "$7,596",
    amountClass: "current-amount",
    growthStatus: "up",
    labelType: "primary",
    growthRate: "25",
    lineTension: 0.5,
  },
  {
    data: SALES_REPORT_DATA.sales,
    borderColor: "#00AAFF",
    borderWidth: 3,
    fill: true,
    backgroundColor: () =>
      chartLinearGradient(element, 300, {
        start: "transparent",
        end: "transparent",
      }),
    label: "Sales",
    pointStyle: "circle",
    pointRadius: "0",
    hoverRadius: "5",
    pointBorderColor: "transparent",
    pointBackgroundColor: "#00AAFF",
    hoverBorderWidth: 5,
    amount: "$4,576",
    amountClass: "current-amount",
    growthStatus: "down",
    growthRate: "15",
    labelType: "info",
    lineTension: 0.5,
  },
];

export const DATA_SCALES = {
  y: {
    grid: {
      color: "#E3E6EF",
      borderDash: [3, 3],
      zeroLineColor: "#E3E6EF",
      zeroLineWidth: 1,
      zeroLineBorderDash: [3, 3],
      drawTicks: false,
      drawBorder: false,
      borderWidth: 0,
    },
    ticks: {
      beginAtZero: true,
      font: {
        size: 14,
        family: "'Jost', sans-serif",
      },
      color: "#747474",
      stepSize: 20,
      padding: 15,
      callback: function (value: string) {
        return value + "k";
      },
    },
  },

  x: {
    offset: true,
    grid: {
      display: false,
      zeroLineWidth: 0,
      drawTicks: true,
      drawBorder: false,
      color: "transparent",
      z: 1,
    },
    ticks: {
      beginAtZero: true,
      font: {
        size: 14,
        family: "'Jost', sans-serif",
      },
      color: "#747474",
    },
  },
};
