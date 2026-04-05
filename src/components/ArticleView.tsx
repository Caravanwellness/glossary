'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Article, Video } from '@/types'
import VideoCarousel from './VideoCarousel'
import VideoModal from './VideoModal'

interface Props {
  conditionName: string
  article: Article
  videos: Video[]
}

export default function ArticleView({ conditionName, article, videos }: Props) {
  const router = useRouter()
  const [modalSrc, setModalSrc] = useState<string | null>(null)

  return (
    <div className="article-section">
<div className="container">
        <div className="articles-grid">
          <div className="article-content">
            <button className="back-btn" onClick={() => router.push('/')}>
              ← Back to Categories
            </button>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <VideoCarousel
              conditionName={conditionName}
              videos={videos}
              onOpenModal={setModalSrc}
            />
          </div>
        </div>
      </div>
      <VideoModal src={modalSrc} onClose={() => setModalSrc(null)} />
    </div>
  )
}
