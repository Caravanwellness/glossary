import type { Metadata } from 'next'
import './globals.css'
import { DEFAULT_VARIANT } from '@/variants'

export const metadata: Metadata = {
  title: DEFAULT_VARIANT.siteTitle,
  description: DEFAULT_VARIANT.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script src="https://player.vimeo.com/api/player.js" async />
      </head>
      <body>{children}</body>
    </html>
  )
}
