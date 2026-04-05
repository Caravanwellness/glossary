import { notFound } from 'next/navigation'
import { articlesData as _articlesData } from '@/data/articles'
import { videosData as _videosData } from '@/data/videos'
import type { ArticlesData, VideosData } from '@/types'

const articlesData = _articlesData as ArticlesData
const videosData = _videosData as VideosData
import ArticleView from '@/components/ArticleView'

function decodeSlug(slug: string): string | undefined {
  const decoded = decodeURIComponent(slug)
  return Object.keys(articlesData).find(
    name => name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, '') === decoded
  )
}

export async function generateStaticParams() {
  return Object.keys(articlesData).map(name => ({
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, ''),
  }))
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const conditionName = decodeSlug(slug)
  if (!conditionName) notFound()

  const articles = articlesData[conditionName]
  const videos = videosData[conditionName] ?? []

  return (
    <ArticleView
      conditionName={conditionName}
      article={articles[0]}
      videos={videos}
    />
  )
}
