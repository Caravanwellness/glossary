/**
 * Branded variants of the glossary.
 *
 * Every variant serves the same content under its own URL prefix:
 *   /                    -> the default CARAVAN look
 *   /mhf                 -> Millennium Health & Fitness
 *   /mhf/condition/acne  -> the same article, MHF branded
 *
 * A variant can also serve a different glossary: set `content` (see
 * src/content-sets.ts). /fw serves the Financial Wellness Glossary at /fw/term/<slug>.
 *
 * To add a client: put its logo files in public/brands/<id>/ and add an entry
 * to VARIANTS below. Routes and static pages are generated from this list.
 * `theme` overrides the CSS variables declared at the top of globals.css; any
 * variable left out keeps its default value.
 */

import type { ContentSetId } from './content-sets'

export type VariantTheme = Record<`--${string}`, string>

export interface Variant {
  id: string
  /** URL prefix with no trailing slash. Empty for the default variant. */
  basePath: string
  /** Which glossary this variant serves. */
  content: ContentSetId
  /** Appended to the browser tab title. */
  brandName?: string
  siteTitle: string
  siteSubtitle: string
  description: string
  /** Logo shown in a bar above the header. */
  logo?: { src: string; alt: string; width: number; height: number }
  icon?: string
  fontHref: string
  disclaimer: string
  copyright: string
  theme: VariantTheme
}

const SHARED = {
  content: 'health' as ContentSetId,
  siteTitle: 'Health Conditions Glossary',
  siteSubtitle: 'Browse Health Information',
  description: 'Browse health information for hundreds of conditions.',
  disclaimer:
    'This content is intended for general information purposes only. It is not intended to be relied upon and is not a substitute for professional financial advice based on your individual conditions and circumstances. Your use of CARAVAN services is subject to additional terms and conditions.',
  copyright: '© 2026 CARAVAN Wellness. All rights reserved.',
}

export const DEFAULT_VARIANT: Variant = {
  ...SHARED,
  id: 'default',
  basePath: '',
  fontHref: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
  theme: {},
}

// Colors, type and logo rules come from "MHF Brand Guidelines - Updated Feb 2026".
const MHF = {
  balanceBlue: '#0c3a5d',
  activeBlue: '#006495',
  wellnessNavy: '#034c70',
  calmSky: '#88c3e0',
  goldenEnergy: '#ffaa33',
  sunbeam: '#ffb651',
  calmSand: '#e9e1d5',
  gray: '#58595b',
  white: '#ffffff',
}

export const VARIANTS: Variant[] = [
  {
    ...SHARED,
    id: 'fw',
    basePath: '/fw',
    content: 'financial',
    siteTitle: 'Financial Wellness Glossary',
    siteSubtitle: 'Browse Financial Terms',
    description: 'Plain-language explanations of common money, insurance, and workplace benefits terms.',
    fontHref: DEFAULT_VARIANT.fontHref,
    theme: {},
  },
  {
    ...SHARED,
    id: 'mhf',
    basePath: '/mhf',
    brandName: 'Millennium Health & Fitness',
    logo: {
      src: '/brands/mhf/logo-primary.png',
      alt: 'Millennium Health & Fitness',
      width: 909,
      height: 201,
    },
    icon: '/brands/mhf/icon.png',
    fontHref: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    theme: {
      '--font-body': "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      '--letter-spacing': '0',
      '--text': '#000000',
      '--muted': MHF.gray,
      '--accent': MHF.activeBlue,
      '--heading': MHF.balanceBlue,
      '--border-accent': 'rgba(0,100,149,0.25)',
      '--header-bg': `linear-gradient(100deg, ${MHF.balanceBlue} 0%, ${MHF.wellnessNavy} 55%, ${MHF.activeBlue} 100%)`,
      '--header-title': MHF.white,
      '--header-sub': MHF.white,
      '--header-image': "url('/brands/mhf/tree-rings.webp')",
      '--header-image-opacity': '0.45',
      '--header-rule-display': 'block',
      '--header-rule': MHF.calmSky,
      '--heading-transform': 'uppercase',
      '--search-icon': MHF.activeBlue,
      '--focus-border': MHF.calmSky,
      '--alpha-bg': MHF.calmSky,
      '--alpha-text': MHF.balanceBlue,
      '--bubble-hover-bg': MHF.activeBlue,
      '--bubble-hover-text': MHF.white,
      '--bubble-hover-border': MHF.activeBlue,
      '--article-heading': MHF.balanceBlue,
      '--article-subheading': MHF.activeBlue,
      '--article-text': MHF.gray,
      '--link-hover': MHF.activeBlue,
      '--slide-hover-border': MHF.activeBlue,
      '--disclaimer-bg': MHF.calmSand,
      '--disclaimer-text': MHF.gray,
      '--footer-bg': MHF.balanceBlue,
      '--footer-text': MHF.white,
      '--scroll-top-bg': MHF.goldenEnergy,
      '--scroll-top-hover': MHF.sunbeam,
      '--scroll-top-text': MHF.balanceBlue,
      '--no-results': MHF.gray,
    },
  },
]

/** Looks up a variant from its URL segment. The default variant has no segment. */
export function getVariant(segment: string): Variant | undefined {
  return VARIANTS.find(v => v.basePath === `/${segment}`)
}
