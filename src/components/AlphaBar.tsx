'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const FALLBACK: Record<string, string> = { Q: 'R', X: 'Y' }

interface Props {
  presentLetters: Set<string>
}

export default function AlphaBar({ presentLetters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px) and (pointer: coarse)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function scrollToLetter(letter: string) {
    const el = document.getElementById(`letter-${letter}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  function handleClick(letter: string) {
    const target = presentLetters.has(letter) ? letter : FALLBACK[letter]
    if (!target) return
    if (pathname === '/') {
      scrollToLetter(target)
    } else {
      router.push(`/#letter-${target}`)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <nav
        ref={barRef}
        className="alpha-bar"
        onScroll={() => setScrolled((barRef.current?.scrollLeft ?? 0) > 10)}
      >
        {LETTERS.map(letter => {
          const active = presentLetters.has(letter) || letter in FALLBACK
          return (
            <a
              key={letter}
              role="button"
              className={active ? '' : 'alpha-inactive'}
              onClick={() => active && handleClick(letter)}
            >
              {letter}
            </a>
          )
        })}
      </nav>

      {/* Mobile hints — correct with React state, no CSS hacks needed */}
      {isMobile && (
        <>
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: 36, height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9em', fontWeight: 600, color: '#00847A',
            backgroundColor: '#B2DBD7', pointerEvents: 'none',
            transition: 'opacity 0.25s', opacity: scrolled ? 0 : 1,
          }}>…Z</div>
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 36, height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9em', fontWeight: 600, color: '#00847A',
            backgroundColor: '#B2DBD7', pointerEvents: 'none',
            transition: 'opacity 0.25s', opacity: scrolled ? 1 : 0,
          }}>A…</div>
        </>
      )}
    </div>
  )
}
