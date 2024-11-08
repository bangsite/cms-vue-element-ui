import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiService } from "../api.service";

const query = {
  lat: "10.762622",
  lon: "106.660172",
  cnt: 5,
  units: "metric",
};
const apiWeatherURL = import.meta.env?.VITE_WEATHER_ENDPOINT;
const apiWeatherKey = import.meta.env?.VITE_WEATHER_KEY;

const axiosConfig: AxiosRequestConfig = {
  baseURL: `${apiWeatherURL}?lat=${query.lat}&lon=${query.lon}&appid=${apiWeatherKey}&cnt=${query.cnt}&units=${query.units}`,
};

const weatherApiService = BaseApiService.getInstance(axiosConfig);

const getOpenWeatherMap = async (config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
  return await weatherApiService.get(``, { ...config });
};

export { getOpenWeatherMap };
