interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ICON_PREFIX: string;
  readonly VITE_ICON_LOCAL_PREFIX: string;
  readonly VITE_AUTH_ROUTE_MODE: "static" | "dynamic";
  readonly VITE_HASH_ROUTE?: "Y" | "N";
}

interface ImportMeta {
  url: string;

  readonly hot?: import("./hot").ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import("./importGlob").ImportGlobFunction;
  /**
   * @deprecated Use `import.meta.glob('*', { eager: true })` instead
   */
  globEager: import("./importGlob").ImportGlobEagerFunction;
}
