/// <reference types="node" />

declare interface ImportMetaEnv {
  VITE_DOMAIN_NAME?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
