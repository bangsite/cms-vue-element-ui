import type { AxiosRequestConfig } from "axios";
import ApiService from "../api.service";
import { AnimeJikan } from "@/constant/externalAPI.ts";

const { url } = AnimeJikan;
const getTrendingAnime = async (config?: AxiosRequestConfig): Promise<any> => {
  return await ApiService.get(`/top/anime`, {
    baseURL: url,
    ...config,
  });
};

export { getTrendingAnime };
