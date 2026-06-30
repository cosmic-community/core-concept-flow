'use client'

import { useState } from 'react'
import type { CosmicImage } from '@/types'

const amounts = [50, 100, 150, 200, 500]

export default function WalletTopUpForm({ qrCode }: { qrCode?: CosmicImage }) {
  const [amount, setAmount] = useState(100)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [txnId, setTxnId] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/wallet-topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, name, email, txnId })
      })
      if (!res.ok) throw new Error('failed')
      setStatus('success')
      setTxnId('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6 border border-white/10">
        <h2 className="text-lg font-bold text-white mb-1">Add Funds</h2>
        <p className="text-sm text-gray-400 mb-4">Select an amount, scan QR, then submit your transaction ID.</p>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {amounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`py-2 rounded-lg text-sm font-semibold transition ${
                amount === a
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              ₹{a}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-blue outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            className="w-full bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-blue outline-none"
          />
          <input
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            placeholder="UPI Transaction ID"
            required
            className="w-full bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-blue outline-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting...' : `Submit ₹${amount} Top-Up`}
          </button>
          {status === 'success' && (
            <p className="text-sm text-green-400">✓ Request submitted! Admin will verify in 15-30 mins.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-400">Something went wrong. Try again.</p>
          )}
        </form>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Scan to Pay via UPI</h3>
        {qrCode?.imgix_url ? (
          <img
            src={`${qrCode.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt="UPI QR Code"
            width={260}
            height={260}
            className="w-64 h-64 rounded-xl bg-white p-2"
          />
        ) : (
          <div className="w-64 h-64 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-gray-500 text-sm text-center px-4">
            QR Code not configured.<br />Set it in Site Settings.
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4 text-center">After paying, copy the UPI transaction ID and submit on the left.</p>
      </div>
    </div>
  )
}