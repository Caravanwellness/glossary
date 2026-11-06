import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VariantShell from '@/components/VariantShell'
import { getVariant, VARIANTS } from '@/variants'

type Params = Promise<{ variant: string }>

export function generateStaticParams() {
  return VARIANTS.map(v => ({ variant: v.basePath.slice(1) }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const variant = getVariant((await params).variant)
  if (!variant) return {}
  return {
    title: variant.brandName ? `${variant.siteTitle} | ${variant.brandName}` : variant.siteTitle,
    description: variant.description,
    icons: variant.icon ? { icon: variant.icon } : undefined,
  }
}

export default async function VariantLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const variant = getVariant((await params).variant)
  if (!variant) notFound()
  return <VariantShell variant={variant}>{children}</VariantShell>
}
