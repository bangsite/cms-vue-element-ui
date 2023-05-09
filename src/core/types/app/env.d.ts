/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_ROOT_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
