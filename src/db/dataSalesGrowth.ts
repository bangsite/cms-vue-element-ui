import type { SalesGrowthData } from "@/interfaces/salesGrowth";

export const DATA_SALES_GROWTH: SalesGrowthData = {
  today: {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    orders: [35, 55, 25, 60, 42, 80, 35],
    sales: [10, 30, 8, 30, 22, 38, 45],
  },
  week: {
    labels: ["1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8"],
    orders: [12, 34, 76, 23, 48, 34, 78],
    sales: [34, 25, 34, 8, 45, 65, 18],
  },
  month: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    orders: [53, 55, 52, 6, 24, 8, 56],
    sales: [16, 54, 80, 37, 76, 78, 54],
  },
};

// @ts-ignore

export const filterDataScales = (data: any) => {
  return {
    y: {
      grid: {
        color: "#485e9029",
        borderDash: [3, 3],
        zeroLineColor: "#485e9029",
        zeroLineWidth: 1,
        zeroLineBorderDash: [3, 3],
      },

      ticks: {
        beginAtZero: true,
        fontSize: 14,
        fontFamily: "Jost",
        color: "#8C90A4",
        max: Math.max(...data.orders),
        stepSize: Math.floor(Math.max(...data.orders) / 5),
        callback(label: any) {
          return `${label}k`;
        },
      },
    },
    x: {
      grid: {
        display: true,
        zeroLineWidth: 2,
        zeroLineColor: "#485e9029",
        color: "transparent",
        z: 1,
      },
      ticks: {
        beginAtZero: true,
        fontSize: 14,
        fontFamily: "Jost",
        color: "#8C90A4",
      },
    },
  };
};

export const filterSalesGrowthDataset = (data: any) => [
  {
    data: [...data.orders],
    backgroundColor: "rgba(130, 49, 211, 0.5)",
    hoverBackgroundColor: "#8231D3",
    label: "Target",
    maxBarThickness: 10,
    barThickness: 12,
    total: "5,875",
    growthRate: "25",
    growthStatus: "up",
    labelType: "primary",
  },
  {
    data: [...data.sales],
    backgroundColor: "rgba(0,170,255,0.5)",
    hoverBackgroundColor: "#00AAFF",
    label: "Total Sales",
    maxBarThickness: 10,
    barThickness: 12,
    total: "2,435",
    growthRate: "17",
    growthStatus: "down",
    labelType: "info",
  },
];
