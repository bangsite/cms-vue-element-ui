export declare global {
  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

  type ComponentRef<T> = InstanceType<T>;

  type LocaleType = "en" | "vi" | "ja";

  type AxiosHeaders = "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";

  type AxiosMethod = "get" | "post" | "delete" | "put";

  type AxiosResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

  interface AxiosConfig {
    params?: any;
    data?: any;
    url?: string;
    method?: AxiosMethod;
    headersType?: string;
    responseType?: AxiosResponseType;
  }

  interface Response<T = any> {
    code: string;
    data: T extends any ? T : T & any;
  }
}
