/// <reference types="node" />

declare interface ImportMetaEnv {
  VITE_DOMAIN_NAME?: string;
  VITE_SERVICE_NAME?: string;
  VITE_API_SERVICE_NAME?: string;
  VITE_HTTPS?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
