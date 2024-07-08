import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
// import ja from "dayjs/locale/ja";

dayjs.extend(isSameOrBefore);
dayjs.extend(localizedFormat);
// dayjs.locale(ja);

export const dateFull = (value: string, format: string = "llll") => {
  if (!value) return "";
  else return `${dayjs(value).format(format)}`;
};

export const dateYMD = (value: string, format: string = "YYYY-MM-DD") => {
  if (!value) return "";
  else return `${dayjs(value).format(format)}`;
};

export const weekdayNames = (value: string, format: string = "dddd") => {
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

export const getWeekdays = (date: string) => {
  const dateOfWeek = new Date(date);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return weekdays[dateOfWeek.getDay()];
};
