const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val);
};

export const isBoolean = (val: unknown): val is boolean => {
  return is(val, "Boolean");
};

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export const isDark = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const isDate = (val: unknown): val is Date => {
  return is(val, "Date");
};

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

export const isFunction = (val: unknown): val is Function => {
  return typeof val === "function";
};

export const isEmpty = <T = unknown>(val: T): val is T => {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
};

export const isNull = (val: unknown): val is null => {
  return val === null;
};

export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val);
};
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};
export const isNumber = (val: unknown): val is number => {
  return is(val, "Number");
};

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

export const isString = (val: unknown): val is string => {
  return is(val, "String");
};

export const isUrl = (path: string): boolean => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};