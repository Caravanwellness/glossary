import BubbleGrid from '@/components/BubbleGrid'
import { itemNames } from '@/lib/content'
import { DEFAULT_VARIANT } from '@/variants'

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const searchTerm = q?.toLowerCase().trim() ?? ''

  return (
    <main>
      <BubbleGrid names={itemNames(DEFAULT_VARIANT.content)} searchTerm={searchTerm} />
    </main>
  )
}
