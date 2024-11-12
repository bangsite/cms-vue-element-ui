import type { AxiosRequestConfig } from "axios";
import { Buffer } from "buffer";
import { BaseApiService } from "../api.service";

const apiRootURL = import.meta.env.VITE_SPROTIFY_ENDPOINT;
const apiSpotifyClientID = import.meta.env.VITE_SPROTIFY_CLIENT_ID;
const apiSpotifyClientSecret = import.meta.env.VITE_SPROTIFY_CLIENT_SECRET;
const apiSpotifyRefreshToken = import.meta.env.VITE_SPROTIFY_RT;

const keys = Buffer.from(`${apiSpotifyClientID}:${apiSpotifyClientSecret}`).toString("base64");

const spotifyApiService = BaseApiService.getInstance(apiRootURL, {
  Authorization: `Basic ${keys}`,
  "Content-Type": "application/x-www-form-urlencoded",
});

const getAccessToken = async (data?: Record<any, any>, config?: AxiosRequestConfig): Promise<any> => {
  return await spotifyApiService.post(
    ``,
    new URLSearchParams({ grant_type: "refresh_token", apiSpotifyRefreshToken }),
    { ...config }
  );
};

const getNewRelease = async (config?: AxiosRequestConfig): Promise<any> => {
  return await spotifyApiService.get(`/browse/new-releases`, { ...config });
};

const getAlbums = async (id: string, config?: AxiosRequestConfig): Promise<any> => {
  return await spotifyApiService.get(`/albums/${id}`, { ...config });
};

export { getAccessToken, getNewRelease, getAlbums };
