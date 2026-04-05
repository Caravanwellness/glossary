'use client'

import { useState, useEffect, useRef } from 'react'
import type { Video } from '@/types'

interface Props {
  conditionName: string
  videos: Video[]
  onOpenModal: (src: string) => void
}

const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <line x1="11" y1="7" x2="3" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <polyline points="6.5,3.5 3,7 6.5,10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <line x1="3" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <polyline points="7.5,3.5 11,7 7.5,10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function VideoCarousel({ conditionName, videos, onOpenModal }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(3)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function update() {
      setVisible(window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.max(0, videos.length - visible)

  function go(dir: -1 | 1) {
    const next = Math.min(maxIndex, Math.max(0, index + dir))
    setIndex(next)
    if (trackRef.current) {
      const slideW = trackRef.current.offsetWidth / visible
      trackRef.current.style.transform = `translateX(${-next * (slideW + 16)}px)`
    }
  }

  if (!videos.length) return null

  return (
    <div className="video-carousel-section">
      <h3>Learn More</h3>
      <div className="video-carousel-outer">
        <button
          className="carousel-arrow"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>

        <div className="video-carousel-track-container">
          <div className="video-carousel-track" ref={trackRef}>
            {videos.map((video, i) => (
              <div key={i} className="video-slide">
                <div
                  className="video-slide-iframe-wrap"
                  onClick={() => onOpenModal(video.src)}
                >
                  <iframe
                    src={video.src}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={video.title}
                  />
                  <div className="video-slide-click-cap" />
                </div>
                <div className="video-slide-info">
                  <p className="video-slide-title">{video.title}</p>
                  <span className="video-slide-tag">{conditionName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-arrow"
          onClick={() => go(1)}
          disabled={index >= maxIndex}
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}
