import axios from "axios";
import { config } from "./config.axios";
import { onRequest } from "./request.axios";
import { onRequestError } from "./requestError.axios";
import { onResponse } from "./response.axios";
import { onResponseError } from "./responseError.axios";

const axiosInstance = axios.create({ ...config });

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export { axiosInstance };
