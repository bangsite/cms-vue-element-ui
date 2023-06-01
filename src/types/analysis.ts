export type AnalysisTotalTypes = {
  id: string;
  title: string;
  value: number;
  unit: string;
  colors: [string, string];
  icon: string;
};

// export type AnalysisTotalTypes = {
//   users: number;
//   messages: number;
//   moneys: number;
//   shopping: number;
// };

export type UserAccessSource = {
  value: number;
  name: string;
};

export type WeeklyUserActivity = {
  value: number;
  name: string;
};

export type MonthlySales = {
  name: string;
  estimate: number;
  actual: number;
};
