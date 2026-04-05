'use client'

import { useEffect } from 'react'

interface Props {
  src: string | null
  onClose: () => void
}

export default function VideoModal({ src, onClose }: Props) {
  useEffect(() => {
    if (!src) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [src, onClose])

  if (!src) return null

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-box" onClick={e => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="video-modal-ratio">
          <iframe
            src={src + '&autoplay=1'}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
