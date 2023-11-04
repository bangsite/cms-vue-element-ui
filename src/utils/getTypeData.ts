export const getTypeData = (data: any) => {
    const value: any = Object.prototype.toString.call(data);
    const map: Record<string, string> = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
        "[object File]": "file",
    };

    if (value instanceof Element) {
        return "element";
    }

    return map[value];
};
