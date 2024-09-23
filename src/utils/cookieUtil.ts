type CookieOption = {
  path?: string;
  secure?: boolean;
  // httpOnly?: boolean; // httpOnly not setup from JavaScript
  samesite?: "lax" | "strict" | "none";
  "max-age"?: number;
  expires?: Date | string | number;
};
export const setCookie = (name: string, value: string, options: CookieOption = {}) => {
  options = {
    ...options,
    path: "/",
    secure: true,
    // httpOnly: true,
    samesite: "lax",
    "max-age": 86400,
  };

  if (options?.expires instanceof Date) {
    options.expires = options?.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const [key, val] of Object.entries(options)) {
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
