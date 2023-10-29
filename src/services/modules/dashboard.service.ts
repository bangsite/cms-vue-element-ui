import ApiService from "../api.service";
import type { AnalysisTotalTypes, MonthlySales, UserAccessSource, WeeklyUserActivity } from "@/types/analysis";

export async function getCountApi(config = {}): Promise<Response<AnalysisTotalTypes[]>> {
  const resp = await ApiService.get("/analysis/total", config);

  return resp.data;
}

export async function getUserAccessSourceApi(config = {}): Promise<Response<UserAccessSource[]>> {
  const resp = await ApiService.get("/analysis/userAccessSource", config);

  return resp.data;
}

export async function getWeeklyUserActivityApi(config = {}): Promise<Response<WeeklyUserActivity[]>> {
  const resp = await ApiService.get("/analysis/weeklyUserActivity", config);

  return resp.data;
}

export async function getMonthlySalesApi(config = {}): Promise<Response<MonthlySales[]>> {
  const resp = await ApiService.get("/analysis/monthlySales", config);

  return resp.data;
}
