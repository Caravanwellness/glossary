'use client'

import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="scroll-top"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 24,
        zIndex: 999,
        background: 'var(--scroll-top-bg)',
        color: 'var(--scroll-top-text)',
        border: 'none',
        borderRadius: '999px',
        padding: '10px 16px',
        fontSize: '0.85em',
        fontWeight: 600,
        fontFamily: 'inherit',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 0.2s',
      }}
    >
      ↑ Top
    </button>
  )
}
