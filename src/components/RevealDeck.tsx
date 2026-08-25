import { useEffect, useRef, type ReactNode } from 'react'
import Reveal from 'reveal.js'
import 'reveal.js/reveal.css'
import 'reveal.js/theme/black.css'

type RevealDeckProps = {
  lectureId: string
  children: ReactNode
}

/**
 * Owns the reveal.js lifecycle: init once after slides mount, destroy on unmount
 * or lecture change. Safe under React Strict Mode double-mount.
 */
export function RevealDeck({ lectureId, children }: RevealDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = deckRef.current
    if (!el) return

    let cancelled = false
    const deck = new Reveal(el, {
      hash: true,
      slideNumber: true,
      controls: true,
      progress: true,
      transition: 'fade',
    })

    void deck.initialize().then(() => {
      if (cancelled) {
        deck.destroy()
      }
    })

    return () => {
      cancelled = true
      deck.destroy()
    }
  }, [lectureId])

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">{children}</div>
    </div>
  )
}
