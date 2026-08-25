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

const DEFAULT_RELAY = 'https://multiplex.up.railway.app'

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '')
}

function isGitHubPagesHost(hostname: string): boolean {
  return /\.github\.io$/i.test(hostname)
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
  const url = normalizeUrl(
    import.meta.env.VITE_MULTIPLEX_URL?.trim() || DEFAULT_RELAY,
  )
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
