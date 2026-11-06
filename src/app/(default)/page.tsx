import BubbleGrid from '@/components/BubbleGrid'

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const searchTerm = q?.toLowerCase().trim() ?? ''

  return (
    <main>
      <BubbleGrid searchTerm={searchTerm} />
    </main>
  )
}
