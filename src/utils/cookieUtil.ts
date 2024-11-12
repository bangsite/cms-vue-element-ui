type CookieOption = {
  path?: string;
  secure?: boolean;
  httpOnly?: boolean; // httpOnly not setup from JavaScript
  samesite?: "lax" | "strict" | "none";
  "max-age"?: number;
  expires?: Date | string | number;
};
export const setCookie = (name: string, value: string, options: CookieOption = {}) => {
  const config = {
    ...options,
    path: "/",
    secure: true,
    // httpOnly: true,
    samesite: "lax",
    // "max-age": 86400,
  };

  if (config?.expires instanceof Date) {
    config.expires = config?.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const [key, val] of Object.entries(config)) {
    updatedCookie += `; ${key}`;
    if (val !== true) updatedCookie += `=${val}`;
  }

  document.cookie = updatedCookie;
};

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", { "max-age": -1 });
};
