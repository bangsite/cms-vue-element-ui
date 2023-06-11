export declare global {
  interface Fn<T = any> {
    (...arg: T[]): T;
  }

  type Nullable<T> = T | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>;

  type ComponentRef<T> = InstanceType<T>;

  type AxiosHeaders = "application/json" | "application/x-www-form-urlencoded" | "multipart/form-data";
  type AxiosMethod = "get" | "post" | "delete" | "put";
  type AxiosResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

  type LocaleType = "en" | "vi" | "ja";
  /**
   * The name of the layout component
   * - basic: base layout
   * - blank: blank layout
   */
  type LayoutComponentType = "basic" | "blank";
  /**
   * login module
   * - pwd-login: password login
   * - code-login: mobile phone verification code login
   * - register: register
   * - reset-pwd: reset password
   * - bind-wechat: WeChat binding
   */
  type LoginModule = "pwd-login" | "code-login" | "register" | "reset-pwd" | "bind-wechat";
  /**
   * layout mode
   * - vertical: left menu mode
   * - horizontal: top menu mode
   * - vertical-mix: left menu mix mode
   * - horizontal-mix: top menu blend mode
   */
  type ThemeLayoutMode = "vertical" | "horizontal" | "vertical-mix" | "horizontal-mix";

  /**
   * The way the scroll bar appears when the content overflows
   * - The outermost element of the wrapper layout component has a scroll bar
   * - content The scroll bar appears in the main content component
   */
  type ThemeScrollMode = "wrapper" | "content";
  type ThemeTabMode = "chrome" | "button";
  type ThemeHorizontalMenuPosition = "flex-start" | "center" | "flex-end";
  type ThemeAnimateMode = "zoom-fade" | "zoom-out" | "fade-slide" | "fade" | "fade-bottom" | "fade-scale";

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
