import type { AxiosRequestConfig } from "axios";
import ApiService from "../api.service";
import { Weather } from "@/constant/externalAPI.ts";

const { url, key } = Weather;
const query = {
  name_city: "Ho Chi Minh",
  lang: "vi",
  days: "7",
};
const getWeather = async (config?: AxiosRequestConfig): Promise<any> => {
  return await ApiService.get(``, {
    baseURL: `${url}?&q=${query.name_city}&lang=${query.lang}&key=${key}`,
    ...config,
  });
};

export { getWeather };
