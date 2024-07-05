export type LocaleType = "en" | "vi" | "ja";

export interface LocaleDropdownOption {
  lang: string;
  name: string;
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
