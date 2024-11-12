export type LocaleType = "en" | "ja" | "vi";

export interface LocaleDropdownOption {
  lang: string;
  name: string;
  currency: string;
  icon?: string;
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
