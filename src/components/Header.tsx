'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useVariant } from './VariantProvider'
import { CONTENT_SETS } from '@/content-sets'

export default function Header() {
  const router = useRouter()
  const { basePath, logo, siteTitle, siteSubtitle, content } = useVariant()
  const { searchPlaceholder } = CONTENT_SETS[content]
  const home = basePath || '/'

  return (
    <>
      {logo && (
        <div className="brand-bar">
          <Link href={home} className="brand-logo">
            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority unoptimized />
          </Link>
        </div>
      )}
      <header className="site-header">
        <h1>{siteTitle}</h1>
        <p>{siteSubtitle}</p>
        <div className="search-container">
          <div className="search-input-wrap">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
              <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder.replace(/\.+$/, '')}
              onChange={e => {
                const q = e.target.value.trim()
                router.push(q ? `${home}?q=${encodeURIComponent(q)}` : home)
              }}
            />
          </div>
        </div>
      </header>
    </>
  )
}
