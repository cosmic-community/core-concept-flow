'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

const tabs = [
  { label: 'Home', href: '/' },
  { label: 'Explore Store', href: '/store' },
  { label: 'My Library', href: '/library' },
  { label: 'Wallet', href: '/wallet' },
  { label: 'Support', href: '/support' },
  { label: 'Admin', href: '/admin' }
]

export default function Navbar({ settings }: { settings: SiteSettings | null }) {
  const [open, setOpen] = useState(false)
  const brand = getMetafieldValue(settings?.metadata?.brand_text) || 'PixelChowk.in (BETA)'
  const logo = settings?.metadata?.logo

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          {logo?.imgix_url ? (
            <img
              src={`${logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt="Logo"
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg object-cover"
            />
          ) : (
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-lg">🎮</span>
          )}
          <span className="font-bold text-sm sm:text-base gradient-text">{brand}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="px-3 py-2 text-sm text-gray-300 hover:text-neon-blue transition-colors rounded-lg hover:bg-white/5"
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-200 p-2"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-200 mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-gray-200 mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-gray-200"></span>
        </button>
      </div>

      {open && (
        <nav className="md:hidden glass border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2 text-sm text-gray-300 hover:text-neon-blue rounded-lg hover:bg-white/5"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}