import type { SiteSettings } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  const brand = getMetafieldValue(settings?.metadata?.brand_text) || 'PixelChowk.in (BETA)'
  const instagram = getMetafieldValue(settings?.metadata?.instagram_link)

  return (
    <footer className="glass border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="gradient-text font-semibold">{brand}</span>. Steam Account Activation System.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-pink transition-colors"
            >
              Instagram
            </a>
          )}
          <a href="/support" className="hover:text-neon-blue transition-colors">Support</a>
        </div>
      </div>
    </footer>
  )
}