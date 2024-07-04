import type { AxiosRequestConfig } from "axios";
import { Buffer } from "buffer";
import { BaseApiService } from "../api.service";

const apiSpotifyAccount = import.meta.env.VITE_API_SPOTIFY_ACCOUNT;
const apiSpotifyURL = import.meta.env.VITE_API_SPOTIFY_URL;
const apiSpotifyClientID = import.meta.env.VITE_API_SPOTIFY_CLIENT_ID;
const apiSpotifyClientSecret = import.meta.env.VITE_API_SPOTIFY_CLIENT_SECRET;
const apiSpotifyRefreshToken = import.meta.env.VITE_API_SPOTIFY_REFRESH_TOKEN;

const keys = Buffer.from(`${apiSpotifyClientID}:${apiSpotifyClientSecret}`).toString("base64");

const spotifyAccountApiService = new BaseApiService(apiSpotifyAccount, {
  Authorization: `Basic ${keys}`,
  "Content-Type": "application/x-www-form-urlencoded",
});

const spotifyApiService = new BaseApiService(apiSpotifyURL, {
  Authorization: `Basic ${keys}`,
  "Content-Type": "application/x-www-form-urlencoded",
});
const getAccessToken = async (data?: Record<any, any>, config?: AxiosRequestConfig): Promise<any> => {
  return await spotifyAccountApiService.post(
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
