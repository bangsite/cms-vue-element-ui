import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiService } from "../api.service";

const apiAnimeJikanURL = import.meta.env.VITE_ANIMEJIKAN_ENDPOINT;
const animeJikanApiService = BaseApiService.getInstance(apiAnimeJikanURL);

const getTrendingAnime = async (config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
  return await animeJikanApiService.get(`/top/anime`, { ...config });
};

export { getTrendingAnime };
