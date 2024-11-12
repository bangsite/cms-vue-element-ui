import axios from "axios";
import { getCookie, setCookie } from "@/utils";

const ACCESS_TOKEN_KEY = "__x_key_at__";
const REFRESH_TOKEN_KEY = "__x_key_rf__";

export const getAccessToken = () => getCookie(ACCESS_TOKEN_KEY);
export const setAccessToken = (token: string) => setCookie(ACCESS_TOKEN_KEY, token);
export const getRefreshToken = () => getCookie(REFRESH_TOKEN_KEY);
export const setRefreshToken = (token: string) => setCookie(REFRESH_TOKEN_KEY, token);

export const refreshToken = async (baseURL: string) => {
  try {
    const response = await axios.post(`${baseURL}/refresh-token`, null, { withCredentials: true });
    const { token, refreshToken } = response.data;

    // setAccessToken(token);
    // setRefreshToken(refreshToken);

    return token;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};
