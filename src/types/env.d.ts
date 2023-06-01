interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ICON_PREFIX: string;
  readonly VITE_ICON_LOCAL_PREFIX: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
