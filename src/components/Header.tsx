'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header className="site-header">
      <h1>Health Conditions Glossary</h1>
      <p>Browse Health Information</p>
      <div className="search-container">
        <div className="search-input-wrap">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
            <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search health conditions..."
            onChange={e => {
              const q = e.target.value.trim()
              router.push(q ? `/?q=${encodeURIComponent(q)}` : '/')
            }}
          />
        </div>
      </div>
    </header>
  )
}
