import en from "element-plus/es/locale/lang/en";
import ja from "element-plus/es/locale/lang/ja";
import vi from "element-plus/es/locale/lang/vi";
import type { LocaleDropdownOption } from "@/types";

export const langEl: Record<string, any> = {
  "en-US": en,
  "ja-JA": ja,
  "vi-VN": vi,
};

export const langOptions: LocaleDropdownOption[] = [
  {
    lang: "en-US",
    currency: "$",
    name: "English",
  },
  {
    lang: "ja-JP",
    currency: "¥",
    name: "Japanese",
  },
  {
    lang: "vi-VN",
    currency: "đ",
    name: "Vietnamese",
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
