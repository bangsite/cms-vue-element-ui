export const isEmpty = <T = unknown>(val: T): val is T => {
  if (Array.isArray(val) || typeof val === "string") {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (val !== null && typeof val === "object") {
    return Object.keys(val).length === 0;
  }

  return false;
};

export const isUrl = (path: string): boolean => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

export const isElement = (val: unknown): val is Element => {
  return val !== null && typeof val === "object" && !!(val as Element).tagName;
};


export const isDark = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

