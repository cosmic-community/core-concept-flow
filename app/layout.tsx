import type { Metadata } from 'next'
import './globals.css'
import { getSiteSettings } from '@/lib/cosmic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'PixelChowk.in (BETA) — Budget Steam Game Activations',
  description: 'Budget-friendly Steam account activations. Add to wallet, buy games, get instant credentials.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  const settings = await getSiteSettings()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>" />
        <script src="/dashboard-console-capture.js" />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6a436a00eef00fdac9d0d8a8"></script>
      </head>
      <body className="font-sans antialiased">
        <Navbar settings={settings} />
        <main className="min-h-screen">{children}</main>
        <Footer settings={settings} />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}