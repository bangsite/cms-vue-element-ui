export interface Language {
  el: Recordable;
  name: string;
}

export interface LocaleDropdownType {
  lang: LocaleType;
  name?: string;
  elLocale?: Language;
}

export interface LocaleState {
  currentLocale: LocaleDropdownType;
  localeMap: LocaleDropdownType[];
}
