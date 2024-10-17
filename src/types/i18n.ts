export type LocaleType = "en-US" | "ja-JP" | "vi-VN";

export interface LocaleDropdownOption {
  lang: string;
  name: string;
  currency: string;
}

export interface LocaleDropdownType {
  lang: LocaleType;
  name?: string;
  elLocale?: Record<LocaleType, any>;
}

export interface LocaleState {
  currentLocale: LocaleDropdownType;
  localeMap: LocaleDropdownOption[];
}
