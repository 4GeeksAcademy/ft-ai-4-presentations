import { useEffect, useRef, type ReactNode } from 'react'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'
import { loadScriptsInOrder, resolveMultiplex } from '../multiplex/resolve'

type RevealDeckProps = {
  lectureId: string
  children: ReactNode
}

type Deck = InstanceType<typeof Reveal>
type WindowWithReveal = Window & { Reveal?: Deck }

function homeHref(): string {
  const params = new URLSearchParams(window.location.search)
  params.delete('lecture')
  params.delete('print-pdf')
  const query = params.toString()
  return `${import.meta.env.BASE_URL}${query ? `?${query}` : ''}`
}

/**
 * Owns the reveal.js lifecycle: init once after slides mount, destroy on unmount
 * or lecture change. Safe under React Strict Mode double-mount.
 * Multiplex scripts expect a global `Reveal` pointing at the deck instance.
 */
export function RevealDeck({ lectureId, children }: RevealDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = deckRef.current
    if (!el) return

    let cancelled = false
    let deck: Deck | null = null

    void (async () => {
      const mux = resolveMultiplex()

      deck = new Reveal(el, {
        hash: true,
        slideNumber: true,
        controls: true,
        progress: true,
        transition: 'fade',
        plugins: [RevealNotes],
        ...(mux.config ? { multiplex: mux.config } : {}),
      } as ConstructorParameters<typeof Reveal>[1])

      // reveal-multiplex master.js / client.js call global Reveal.*
      ;(window as WindowWithReveal).Reveal = deck

      try {
        await deck.initialize()
        if (cancelled) {
          deck.destroy()
          return
        }

        if (mux.scriptSrcs.length > 0) {
          await loadScriptsInOrder(mux.scriptSrcs)
        }

        if (cancelled) {
          deck.destroy()
          return
        }

        if (mux.role !== 'off') {
          console.info(`[multiplex] role=${mux.role} id=${mux.config?.id}`)
        }
      } catch (err) {
        console.error('[reveal] failed to start deck', err)
      }
    })()

    return () => {
      cancelled = true
      deck?.destroy()
      const w = window as WindowWithReveal
      if (w.Reveal === deck) {
        delete w.Reveal
      }
    }
  }, [lectureId])

  return (
    <>
      <a className="deck-home-link" href={homeHref()}>
        Course home
      </a>
      <div className="reveal" ref={deckRef}>
        <div className="slides">{children}</div>
      </div>
    </>
  )
}
