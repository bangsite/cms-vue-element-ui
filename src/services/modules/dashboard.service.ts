import ApiService from "../api.service";
import type { AnalysisTotalTypes, MonthlySales, UserAccessSource, WeeklyUserActivity } from "@/types/analysis";

export async function getCountApi(config = {}): Promise<[]> {
  const resp = await ApiService.get("/analysis/total", config);

  return resp.data;
}

export async function getUserAccessSourceApi(config = {}): Promise<[]> {
  const resp = await ApiService.get("/analysis/userAccessSource", config);

  return resp.data;
}

export async function getWeeklyUserActivityApi(config = {}): Promise<[]> {
  const resp = await ApiService.get("/analysis/weeklyUserActivity", config);

  return resp.data;
}

export async function getMonthlySalesApi(config = {}): Promise<[]> {
  const resp = await ApiService.get("/analysis/monthlySales", config);

  return resp.data;
}
