import en from "element-plus/es/locale/lang/en";
import ja from "element-plus/es/locale/lang/ja";
import vi from "element-plus/es/locale/lang/vi";
import type { LocaleDropdownOption } from "@/types";

export const langEl: Record<string, any> = {
  en: en,
  ja: ja,
  vi: vi,
};

export const langOptions: LocaleDropdownOption[] = [
  {
    lang: "en",
    currency: "$",
    name: "English",
    icon: "twemoji:flag-united-states",
  },
  {
    lang: "ja",
    currency: "¥",
    name: "Japanese",
    icon: "twemoji:flag-japan",
  },
  {
    lang: "vi",
    currency: "đ",
    name: "Vietnamese",
    icon: "twemoji:flag-vietnam",
  },
];

export const langCurrency = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD",
    },
  },

  "vi-VN": {
    currency: {
      style: "currency",
      currency: "VND",
    },
  },

  "ja-JP": {
    currency: {
      style: "currency",
      currency: "JPY",
    },
  },
};
