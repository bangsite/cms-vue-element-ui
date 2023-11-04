import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const dateYMD = (value: string, format: string = "YYYY-MM-DD") => {
    if (!value) return "";
    else return `${dayjs(value).format(format)}`;
};

export const timeHSM = (value: string, format: string = "HH:mm:ss") => {
    if (!value) return "";
    else return `${dayjs(value).format(format)}`;
};

export const dateTime = (value: string, format: string = "YYYY-MM-DD HH:mm:ss") => {
    if (!value) return "";
    else return `${dayjs(value).format(format)}`;
};
