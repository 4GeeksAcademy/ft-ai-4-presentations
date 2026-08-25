/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MULTIPLEX_URL?: string
  readonly VITE_MULTIPLEX_ID?: string
  /** Local master only — never set in CI or commit. */
  readonly VITE_MULTIPLEX_SECRET?: string
  /** Set to `master` in `.env.local` for local presenter default. */
  readonly VITE_MULTIPLEX_ROLE?: string
  /** Public Pages origin for student links (no trailing slash). */
  readonly VITE_PUBLIC_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
