import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { HttpStatusCode } from "axios";
import { useRouter } from "vue-router";
import { notifier } from "@/notifications";
import { refreshToken } from "@/services/modules/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export class BaseApiService {
  private static instances: Map<string, BaseApiService> = new Map(); // Map to store instances based on baseURL
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private retryCount = 0;
  private maxRetryAttempts = 3; // Retry limit

  private constructor(axiosConfig: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      ...axiosConfig,
    });
    // setup interceptor
    this.setupInterceptors();
  }

  // Singleton static method to get or create the instance
  public static getInstance = (axiosConfig: AxiosRequestConfig) => {
    if (!axiosConfig.baseURL) {
      throw new Error("baseURL is required");
    }

    if (!this.instances.has(axiosConfig.baseURL)) {
      this.instances.set(axiosConfig.baseURL, new BaseApiService(axiosConfig));
    }
    return this.instances.get(axiosConfig.baseURL);
  };

  private setupInterceptors = () => {
    this.axiosInstance.interceptors.request.use(this.onRequest, this.onRequestError);
    this.axiosInstance.interceptors.response.use(this.onResponse, this.onResponseError);
  };

  private onRequest = (config: InternalAxiosRequestConfig) => {
    // Optional: Add token handling logic here
    return config;
  };

  private onRequestError = (error: Error | AxiosError): Promise<AxiosError> => {
    const status = (error as AxiosError)?.response?.status || 0;
    const message = error?.message || (error as AxiosError)?.response?.statusText || "";
    const title = "";

    notifier.showError(title, message, status);

    return Promise.reject(error);
  };

  private onResponse = (response: AxiosResponse): AxiosResponse => {
    const url = response?.request?.responseURL || response?.data?.data;
    const status = response.status;
    const title = "";
    const message = response.data.message;

    // If it's an OAuth provider URL, skip notifications and redirect
    if (url && (url.includes("google") || url.includes("facebook") || url.includes("github"))) {
      return response;
    }

    if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
      notifier.showSuccess(title, message, status);
    }

    return response;
  };

  private onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    const status = error?.response?.data?.status || 0;
    const message = error?.response?.data?.message || error?.response?.statusText || "";
    const title = "";
    const statusRes = status || 0;
    const messageRes = message || error?.message || "";

    if (status === HttpStatusCode.Unauthorized) {
      return await this.handleRefreshToken(error);
    }

    notifier.showError(title, messageRes, statusRes);
    return Promise.reject(error);
  };

  private handleRefreshToken = async (error: AxiosError): Promise<AxiosError> => {
    const { resetAuth } = useAuthStore();
    const router = useRouter();

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.retryCount = 0;
    }
    if (this.retryCount < this.maxRetryAttempts) {
      this.retryCount++;

      try {
        await refreshToken();

        // Retry the original request with new token
        return this.axiosInstance.request(error.config as AxiosRequestConfig);
      } catch (err) {
        // If refresh fails, logout and redirect to login again
        notifier.showError("Error", "Please login again.", HttpStatusCode.Unauthorized);
        resetAuth();
        await router.push("/login");
        throw err;
      } finally {
        this.isRefreshing = false; // Reset flag after each refresh attempt
      }
    }
    // Return the error if max retries are exceeded
    return Promise.reject(error);
  };

  // Generic methods for making requests
  // public request<T>(
  //   method: "get" | "post" | "put" | "patch" | "delete",
  //   url: string,
  //   data?: any,
  //   headers: Record<string, string> = {},
  //   config: AxiosRequestConfig = {}
  // ): Promise<AxiosResponse<T>> {
  //   const requestConfig: AxiosRequestConfig = {
  //     method,
  //     url,
  //     data,
  //     headers,
  //     ...config,
  //   };
  //   return this.axiosInstance.request<T>(requestConfig);
  // }

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

  // public postWithFile<T = unknown>(url: string, file: File, config?: AxiosRequestConfig) {
  //   return this.axiosInstance.post<T>(url, file, {
  //     ...config,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // }
}
