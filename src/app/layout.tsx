import type { Metadata } from 'next'
import './globals.css'
import ClientNav from '@/components/ClientNav'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Health Conditions Glossary',
  description: 'Browse health information for hundreds of conditions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://player.vimeo.com/api/player.js" async />
      </head>
      <body>
        <ClientNav />
        {children}
        <div className="disclaimer-section">
          <p className="footer-disclaimer">This content is intended for general information purposes only. It is not intended to be relied upon and is not a substitute for professional financial advice based on your individual conditions and circumstances. Your use of CARAVAN services is subject to additional terms and conditions.</p>
        </div>
        <footer>
          <p>&copy; 2026 CARAVAN Wellness. All rights reserved.</p>
        </footer>
        <ScrollToTop />
      </body>
    </html>
  )
}
