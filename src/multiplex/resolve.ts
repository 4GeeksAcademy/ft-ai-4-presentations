export type MultiplexRole = 'off' | 'client' | 'master'

export type MultiplexConfig = {
  secret: string | null
  id: string
  url: string
}

export type ResolvedMultiplex = {
  role: MultiplexRole
  config: MultiplexConfig | null
  /** Scripts to load in order (socket.io, then master|client). */
  scriptSrcs: string[]
}

export type MultiplexToken = {
  secret: string
  /** Token JSON field; use as multiplex `id`. */
  socketId: string
}

const DEFAULT_RELAY = 'https://multiplex.up.railway.app'
const DEFAULT_PUBLIC_SITE =
  'https://4geeksacademy.github.io/ft-ai-4-presentations'

export function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '')
}

export function multiplexRelayUrl(): string {
  return normalizeUrl(
    import.meta.env.VITE_MULTIPLEX_URL?.trim() || DEFAULT_RELAY,
  )
}

/** Audience-facing Pages origin (no trailing slash). */
export function publicSiteUrl(): string {
  return normalizeUrl(
    import.meta.env.VITE_PUBLIC_SITE_URL?.trim() || DEFAULT_PUBLIC_SITE,
  )
}

export function isGitHubPagesHost(hostname = window.location.hostname): boolean {
  return /\.github\.io$/i.test(hostname)
}

/** Presenter tools / master UI: local or LAN only — never github.io. */
export function isLocalPresenterHost(
  hostname = window.location.hostname,
): boolean {
  if (isGitHubPagesHost(hostname)) return false
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname.endsWith('.local')
  )
}

/**
 * Resolve multiplex role from query + env.
 * - No `id` → off (normal solo deck)
 * - Default with `id` → client (`secret: null`)
 * - Master only when requested, secret present, and **not** on github.io
 */
export function resolveMultiplex(
  search = window.location.search,
  hostname = window.location.hostname,
): ResolvedMultiplex {
  const params = new URLSearchParams(search)
  const url = multiplexRelayUrl()
  const id =
    params.get('id')?.trim() ||
    import.meta.env.VITE_MULTIPLEX_ID?.trim() ||
    ''

  if (!id) {
    return { role: 'off', config: null, scriptSrcs: [] }
  }

  const wantMaster =
    params.get('role') === 'master' ||
    import.meta.env.VITE_MULTIPLEX_ROLE === 'master'
  const secret =
    params.get('secret')?.trim() ||
    import.meta.env.VITE_MULTIPLEX_SECRET?.trim() ||
    ''
  const onPages = isGitHubPagesHost(hostname)

  if (wantMaster && onPages) {
    console.warn(
      '[multiplex] Master role is blocked on GitHub Pages; using client mode.',
    )
  } else if (wantMaster && !secret) {
    console.warn(
      '[multiplex] Master requested but no secret (query or VITE_MULTIPLEX_SECRET); using client mode.',
    )
  } else if (wantMaster && secret && !onPages) {
    return {
      role: 'master',
      config: { secret, id, url },
      scriptSrcs: [`${url}/socket.io/socket.io.js`, `${url}/master.js`],
    }
  }

  return {
    role: 'client',
    config: { secret: null, id, url },
    scriptSrcs: [`${url}/socket.io/socket.io.js`, `${url}/client.js`],
  }
}

/** Fetch a fresh secret + socketId from the relay (dev proxy first). */
export async function fetchMultiplexToken(
  relayUrl = multiplexRelayUrl(),
): Promise<MultiplexToken> {
  const candidates = [
    '/__multiplex/token',
    `${normalizeUrl(relayUrl)}/token`,
  ]

  let lastError: unknown
  for (const url of candidates) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const data = (await res.json()) as {
        secret?: string
        socketId?: string
      }
      if (!data.secret || !data.socketId) {
        throw new Error('Token response missing secret or socketId')
      }
      return { secret: data.secret, socketId: data.socketId }
    } catch (err) {
      lastError = err
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Could not fetch multiplex token')
}

export function buildStudentLink(opts: {
  lectureId: string
  socketId: string
  siteUrl?: string
}): string {
  const base = opts.siteUrl ?? publicSiteUrl()
  const params = new URLSearchParams({
    lecture: opts.lectureId,
    id: opts.socketId,
  })
  return `${base}/?${params.toString()}`
}

export function buildMasterLink(opts: {
  lectureId: string
  socketId: string
  secret: string
  origin?: string
  base?: string
}): string {
  const origin = opts.origin ?? window.location.origin
  const base = opts.base ?? import.meta.env.BASE_URL
  const params = new URLSearchParams({
    lecture: opts.lectureId,
    role: 'master',
    id: opts.socketId,
    secret: opts.secret,
  })
  const path = base.endsWith('/') ? base : `${base}/`
  return `${origin}${path}?${params.toString()}`
}

export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-multiplex-src="${src}"]`,
    )
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = false
    script.dataset.multiplexSrc = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

export async function loadScriptsInOrder(srcs: string[]): Promise<void> {
  for (const src of srcs) {
    await loadScript(src)
  }
}
