'use client'

import { useRouter } from 'next/navigation'
import { encodeSlug } from '@/lib/slug'
import { CONTENT_SETS } from '@/content-sets'
import { useVariant } from './VariantProvider'

interface Props {
  names: string[]
  searchTerm: string
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export default function BubbleGrid({ names, searchTerm }: Props) {
  const router = useRouter()
  const { basePath, content } = useVariant()
  const { itemSegment } = CONTENT_SETS[content]

  const grouped = LETTERS.reduce<Record<string, string[]>>((acc, letter) => {
    const filtered = names.filter(name =>
      name[0].toUpperCase() === letter &&
      (!searchTerm || name.toLowerCase().includes(searchTerm))
    )
    if (filtered.length) acc[letter] = filtered
    return acc
  }, {})

  return (
    <div className="container">
      {LETTERS.map(letter => {
        const items = grouped[letter]
        if (!items) return null
        return (
          <section
            key={letter}
            id={`letter-${letter}`}
            className="letter-section"
          >
            <h2 className="letter-header">{letter}</h2>
            <div className="bubbles-grid">
              {items.map(name => (
                <button
                  key={name}
                  className="bubble"
                  onClick={() => router.push(`${basePath}/${itemSegment}/${encodeSlug(name)}`)}
                >
                  {name}
                </button>
              ))}
            </div>
          </section>
        )
      })}

      {Object.keys(grouped).length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--no-results)', padding: '60px 0', fontSize: '1.1em' }}>
          No results found for &ldquo;{searchTerm}&rdquo;
        </p>
      )}
    </div>
  )
}
