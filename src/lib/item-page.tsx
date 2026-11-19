import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleView from '@/components/ArticleView'
import { findItemName, getContent, slugParams, variantForSegment, variantItemParams } from './content'

type Params = Promise<{ variant?: string; slug: string }>

/** Placeholder slug; never matches an item name, so it 404s. */
const NO_ITEMS = '_none'

/**
 * Everything an item route (/condition/[slug], /[variant]/term/[slug], ...) exports.
 * Each route file re-exports these and declares its own `dynamicParams`.
 */
export function itemRoute(segment: 'condition' | 'term', options: { variantRoute: boolean }) {
  async function resolve(params: Params) {
    const { variant: variantSegment, slug } = await params
    const variant = variantForSegment(options.variantRoute ? variantSegment ?? '' : undefined, segment)
    const name = variant && findItemName(variant.content, slug)
    if (!variant || !name) return undefined
    return { variant, name }
  }

  function generateStaticParams({ params }: { params?: { variant?: string; slug?: string } } = {}) {
    if (!options.variantRoute) {
      const variant = variantForSegment(undefined, segment)
      return variant ? slugParams(variant.content) : []
    }
    // Next calls this once per variant from [variant]/layout, so return only the slug.
    // Next 16.2 drops every path of the route if any variant returns [], so a variant
    // that doesn't use this segment gets one placeholder slug, which renders a 404.
    const slugs = variantItemParams(segment, params?.variant).map(({ slug }) => ({ slug }))
    return slugs.length ? slugs : [{ slug: NO_ITEMS }]
  }

  async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const found = await resolve(params)
    if (!found) return {}
    const { variant, name } = found
    const site = variant.brandName ? `${variant.siteTitle} | ${variant.brandName}` : variant.siteTitle
    const article = getContent(variant.content).articles[name][0]
    return { title: `${name} | ${site}`, description: article.preview || variant.description }
  }

  async function Page({ params }: { params: Params }) {
    const found = await resolve(params)
    if (!found) notFound()
    const { articles, videos } = getContent(found.variant.content)
    return (
      <ArticleView
        conditionName={found.name}
        article={articles[found.name][0]}
        videos={videos[found.name] ?? []}
      />
    )
  }

  return { generateStaticParams, generateMetadata, Page }
}
