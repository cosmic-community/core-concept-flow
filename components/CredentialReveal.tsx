'use client'

import { useState } from 'react'
import type { Order } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CredentialReveal({ order }: { order: Order }) {
  const [open, setOpen] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [copied, setCopied] = useState('')

  const game = order.metadata?.game
  const gameTitle = game ? (getMetafieldValue(game.metadata?.game_title) || game.title) : 'Game'
  const poster = game?.metadata?.poster_image
  const platform = getMetafieldValue(order.metadata?.platform_details) || 'Steam Client'
  const username = getMetafieldValue(order.metadata?.steam_username)
  const password = getMetafieldValue(order.metadata?.steam_password)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition"
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-base-dark flex-shrink-0">
          {poster?.imgix_url ? (
            <img
              src={`${poster.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={gameTitle}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🎮</div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{gameTitle}</h3>
          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            ACTIVATION READY
          </span>
        </div>
        <span className="text-gray-400 text-xl">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="p-4 pt-0 space-y-3 animate-fadeUp">
          <CredRow label="Platform" value={platform} readOnly />
          <CredRow
            label="Account Username"
            value={username}
            onCopy={() => copy(username, 'user')}
            copied={copied === 'user'}
          />
          <div>
            <label className="block text-xs text-gray-400 mb-1">Account Password</label>
            <div className="flex items-center gap-2 bg-base-dark border border-white/10 rounded-lg px-3 py-2">
              <span className="flex-1 text-sm text-gray-200 font-mono truncate">
                {showPass ? password : '••••••••••'}
              </span>
              <button onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-neon-blue text-sm">
                {showPass ? '🙈' : '👁️'}
              </button>
              <button
                onClick={() => copy(password, 'pass')}
                className="text-gray-400 hover:text-neon-blue text-sm"
              >
                {copied === 'pass' ? '✓' : '📋'}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 bg-white/5 rounded-lg p-3">
            Need a 2FA/Steam Guard security code? Ping us in the Support Chat tab!
          </p>
        </div>
      )}
    </div>
  )
}

function CredRow({
  label,
  value,
  onCopy,
  copied,
  readOnly
}: {
  label: string
  value: string
  onCopy?: () => void
  copied?: boolean
  readOnly?: boolean
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex items-center gap-2 bg-base-dark border border-white/10 rounded-lg px-3 py-2">
        <span className="flex-1 text-sm text-gray-200 font-mono truncate">{value || '—'}</span>
        {!readOnly && onCopy && (
          <button onClick={onCopy} className="text-gray-400 hover:text-neon-blue text-sm">
            {copied ? '✓' : '📋'}
          </button>
        )}
      </div>
    </div>
  )
}