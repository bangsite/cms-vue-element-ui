import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiService } from "../api.service";
import { OpenWeatherMap } from "@/constants/externalAPI";
interface ApiResponse<T> {
  data: T;
}
// const { url, key } = Weather;
// const { url, key } = Weather;
// const query = {
//   name_city: "Ho Chi Minh",
//   lang: "en",
//   days: 7,
// };

const { url, key } = OpenWeatherMap;
const query = {
  lat: "10.762622",
  lon: "106.660172",
  cnt: 5,
  units: "metric",
};

// const getWeather = async (config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
//   return await ApiService.get(``, {
//     baseURL: `${url}/daily?&q=${query.name_city}&lang=${query.lang}&key=${key}&days=${query.days}`,
//     ...config,
//   });
// };

const getOpenWeatherMap = async (config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  // return await fetch(`${url}?lat=${query.lat}&lon=${query.lon}&appid=${key}`);

  return await ApiService.get(``, {
    baseURL: `${url}?lat=${query.lat}&lon=${query.lon}&appid=${key}&cnt=${query.cnt}&units=${query.units}`,
    ...config,
  });
};

export { getOpenWeatherMap };
