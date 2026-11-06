import { notFound } from 'next/navigation'
import { articlesData as _articlesData } from '@/data/articles'
import { videosData as _videosData } from '@/data/videos'
import { conditionStaticParams, decodeSlug } from '@/lib/conditions'
import type { ArticlesData, VideosData } from '@/types'
import ArticleView from '@/components/ArticleView'

const articlesData = _articlesData as ArticlesData
const videosData = _videosData as VideosData

export const generateStaticParams = conditionStaticParams

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
