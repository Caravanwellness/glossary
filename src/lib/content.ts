import { articlesData } from '@/data/articles'
import { videosData } from '@/data/videos'
import { financialArticlesData } from '@/data/financial-articles'
import { CONTENT_SETS, type ContentSetId } from '@/content-sets'
import type { ArticlesData, VideosData } from '@/types'
import { encodeSlug } from './slug'
import { DEFAULT_VARIANT, getVariant, VARIANTS, type Variant } from '@/variants'

const DATA: Record<ContentSetId, { articles: ArticlesData; videos: VideosData }> = {
  health: { articles: articlesData as ArticlesData, videos: videosData as VideosData },
  financial: { articles: financialArticlesData, videos: {} },
}

export function getContent(id: ContentSetId) {
  return DATA[id]
}

export function itemNames(id: ContentSetId): string[] {
  return Object.keys(DATA[id].articles)
}

export function findItemName(id: ContentSetId, slug: string): string | undefined {
  const decoded = decodeURIComponent(slug)
  return itemNames(id).find(name => encodeSlug(name) === decoded)
}

export function slugParams(id: ContentSetId) {
  return itemNames(id).map(name => ({ slug: encodeSlug(name) }))
}

/** Static params for /[variant]/<segment>/[slug], limited to variants whose content uses that segment. */
export function variantItemParams(segment: string, parentVariant?: string) {
  return VARIANTS
    .filter(v => CONTENT_SETS[v.content].itemSegment === segment)
    .map(v => v.basePath.slice(1))
    .filter(seg => !parentVariant || seg === parentVariant)
    .flatMap(seg => slugParams(getVariant(seg)!.content).map(p => ({ variant: seg, ...p })))
}

/** Resolves the variant for a route, or undefined if it doesn't serve this item segment. */
export function variantForSegment(variantSegment: string | undefined, segment: string): Variant | undefined {
  const variant = variantSegment === undefined ? DEFAULT_VARIANT : getVariant(variantSegment)
  if (!variant || CONTENT_SETS[variant.content].itemSegment !== segment) return undefined
  return variant
}
