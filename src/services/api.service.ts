import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import axios, { HttpStatusCode } from "axios";
import { hideLoading, showLoading } from "@/hooks/useLoading";
import { notifier } from "@/notifications";

export class BaseApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    // set up interceptor
    this.axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    this.axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
  }

  private onRequest = (config: InternalAxiosRequestConfig) => {
    showLoading();

    const token = localStorage.getItem("token");

    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` } as AxiosRequestHeaders;

    // if (i18n.global.locale) {
    //   config.headers = { ...config.headers, "Accept-Language": i18n.global.locale };
    // }

    // if (config?.data instanceof FormData) {
    //   headers["Content-Type"] = "multipart/form-data";
    // } else {
    //   headers["Content-Type"] = "application/json";
    // }

    return config;
  };

  private onRequestError = (error: Error | AxiosError): Promise<AxiosError> => {
    hideLoading();

    const status = (error as AxiosError)?.response?.status || 0;
    const message = error?.message || (error as AxiosError)?.response?.statusText || "";
    const title = "";

    notifier.showError(title, message, status);

    return Promise.reject(error);
  };

  private onResponse = (response: AxiosResponse): AxiosResponse => {
    hideLoading();

    const status = response.status;
    const title = "";
    const message = response.data.message;

    if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
      notifier.showSuccess(title, message, status);
    }

    return response;
  };

  private onResponseError = (error: AxiosError): Promise<AxiosError> => {
    hideLoading();

    const status = (error as AxiosError)?.response?.status || 0;
    const title = "";
    const message = error?.message || (error as AxiosError)?.response?.statusText || "";

    notifier.showError(title, message, status);

    return Promise.reject(error);
  };

  // Generic methods for making requests
  public get<T>(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(`${url}`, { ...config });
  }

  public post<T>(url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(`${url}`, data, { ...config });
  }

  public put<T>(url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, { ...config });
  }

  public patch<T>(url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, { ...config });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, { ...config });
  }

  public postWithFile<T = unknown>(url: string, file: File, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T>(url, file, {
      ...config,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
