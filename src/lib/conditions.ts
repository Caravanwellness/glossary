import { articlesData } from '@/data/articles'

export function encodeSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, '')
}

export function decodeSlug(slug: string): string | undefined {
  const decoded = decodeURIComponent(slug)
  return Object.keys(articlesData).find(name => encodeSlug(name) === decoded)
}

export function conditionStaticParams() {
  return Object.keys(articlesData).map(name => ({ slug: encodeSlug(name) }))
}
