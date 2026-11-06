'use client'

import { useRouter } from 'next/navigation'
import { articlesData } from '@/data/articles'
import { encodeSlug } from '@/lib/conditions'
import { useVariant } from './VariantProvider'

interface Props {
  searchTerm: string
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const allConditions = Object.keys(articlesData)

export default function BubbleGrid({ searchTerm }: Props) {
  const router = useRouter()
  const { basePath } = useVariant()

  const grouped = LETTERS.reduce<Record<string, string[]>>((acc, letter) => {
    const filtered = allConditions.filter(name =>
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
                  onClick={() => router.push(`${basePath}/condition/${encodeSlug(name)}`)}
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
