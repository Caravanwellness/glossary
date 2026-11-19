import { notFound } from 'next/navigation'
import BubbleGrid from '@/components/BubbleGrid'
import { itemNames } from '@/lib/content'
import { getVariant } from '@/variants'

export default async function VariantGlossaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ variant: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const variant = getVariant((await params).variant)
  if (!variant) notFound()
  const { q } = await searchParams
  const searchTerm = q?.toLowerCase().trim() ?? ''

  return (
    <main>
      <BubbleGrid names={itemNames(variant.content)} searchTerm={searchTerm} />
    </main>
  )
}
