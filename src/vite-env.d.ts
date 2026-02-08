/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE: string
  readonly VITE_DASHBOARD_MODE: string
  readonly VITE_ROSE_GOLD_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
