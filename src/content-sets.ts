/**
 * The glossaries this app can serve. A variant picks one with `content`.
 * Only labels live here so client components can import it; the article data
 * is loaded on the server by src/lib/content.ts.
 */
export type ContentSetId = 'health' | 'financial'

export interface ContentSetLabels {
  /** URL segment for item pages: /<basePath>/<itemSegment>/<slug> */
  itemSegment: 'condition' | 'term'
  searchPlaceholder: string
  backLabel: string
}

export const CONTENT_SETS: Record<ContentSetId, ContentSetLabels> = {
  health: {
    itemSegment: 'condition',
    searchPlaceholder: 'Search health conditions...',
    backLabel: '← Back to Categories',
  },
  financial: {
    itemSegment: 'term',
    searchPlaceholder: 'Search financial terms...',
    backLabel: '← Back to Glossary',
  },
}
