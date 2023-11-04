import type { AxiosRequestConfig } from "axios";
import ApiService from "../api.service";
import { Booking } from "@/constant/externalAPI.ts";

const { url, key, host } = Booking;

const getHotels = async (config: AxiosRequestConfig): Promise<any> => {
  return await ApiService.get(`/static/hotels`, {
    baseURL: url,
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    ...config,
  });
};

export { getHotels };
