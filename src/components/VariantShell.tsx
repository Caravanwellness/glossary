import type { CSSProperties } from 'react'
import type { Variant } from '@/variants'
import { itemNames } from '@/lib/content'
import ClientNav from './ClientNav'
import ScrollToTop from './ScrollToTop'
import { VariantProvider } from './VariantProvider'

/** The page chrome around every route, branded for one variant. */
export default function VariantShell({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  const letters = [...new Set(itemNames(variant.content).map(name => name[0].toUpperCase()))]
  return (
    <VariantProvider variant={variant}>
      <link rel="stylesheet" href={variant.fontHref} precedence="default" />
      <div className="variant-root" data-variant={variant.id} style={variant.theme as CSSProperties}>
        <ClientNav letters={letters} />
        {children}
        <div className="disclaimer-section">
          <p className="footer-disclaimer">{variant.disclaimer}</p>
        </div>
        <footer>
          <p>{variant.copyright}</p>
        </footer>
        <ScrollToTop />
      </div>
    </VariantProvider>
  )
}
