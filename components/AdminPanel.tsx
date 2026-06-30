'use client'

import { useState } from 'react'
import type { Order, WalletTopUp } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AdminPanel({
  orders,
  topups
}: {
  orders: Order[]
  topups: WalletTopUp[]
}) {
  const [tab, setTab] = useState<'orders' | 'topups'>('orders')

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('orders')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            tab === 'orders' ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-white/5 text-gray-300'
          }`}
        >
          Pending Orders ({orders.filter((o) => getMetafieldValue(o.metadata?.status) === 'Pending').length})
        </button>
        <button
          onClick={() => setTab('topups')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            tab === 'topups' ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-white/5 text-gray-300'
          }`}
        >
          Wallet Top-Ups ({topups.filter((t) => getMetafieldValue(t.metadata?.status) === 'Pending').length})
        </button>
      </div>

      {tab === 'orders' ? (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders found.</p>
          ) : (
            orders.map((o) => <OrderRow key={o.id} order={o} />)
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {topups.length === 0 ? (
            <p className="text-gray-400">No top-up requests found.</p>
          ) : (
            topups.map((t) => <TopUpRow key={t.id} topup={t} />)
          )}
        </div>
      )}
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const [username, setUsername] = useState(getMetafieldValue(order.metadata?.steam_username))
  const [password, setPassword] = useState(getMetafieldValue(order.metadata?.steam_password))
  const [platform, setPlatform] = useState(getMetafieldValue(order.metadata?.platform_details) || 'Steam Client')
  const [status, setStatus] = useState(getMetafieldValue(order.metadata?.status) || 'Pending')
  const [saving, setSaving] = useState(false)

  const game = order.metadata?.game
  const gameTitle = game ? (getMetafieldValue(game.metadata?.game_title) || game.title) : '—'

  const approve = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/approve-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, username, password, platform })
      })
      if (res.ok) setStatus('Approved')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{getMetafieldValue(order.metadata?.customer_name) || order.title}</h3>
          <p className="text-xs text-gray-400">{getMetafieldValue(order.metadata?.customer_email)} · {gameTitle}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === 'Approved' ? 'bg-green-500/20 text-green-400' :
          status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>{status}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform" className="bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-neon-blue" />
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Steam Username" className="bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-neon-blue" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Steam Password" className="bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-neon-blue" />
      </div>
      <button
        onClick={approve}
        disabled={saving || status === 'Approved'}
        className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
      >
        {saving ? 'Saving...' : status === 'Approved' ? '✓ Activated' : 'Approve Activation'}
      </button>
    </div>
  )
}

function TopUpRow({ topup }: { topup: WalletTopUp }) {
  const [status, setStatus] = useState(getMetafieldValue(topup.metadata?.status) || 'Pending')
  const [saving, setSaving] = useState(false)

  const update = async (newStatus: 'Approved' | 'Rejected') => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/approve-topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: topup.id, status: newStatus })
      })
      if (res.ok) setStatus(newStatus)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-4">
      <div>
        <h3 className="font-semibold text-white">{getMetafieldValue(topup.metadata?.customer_name) || topup.title}</h3>
        <p className="text-xs text-gray-400">
          ₹{topup.metadata?.amount ?? 0} · TXN: {getMetafieldValue(topup.metadata?.transaction_id) || '—'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          status === 'Approved' ? 'bg-green-500/20 text-green-400' :
          status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>{status}</span>
        {status === 'Pending' && (
          <>
            <button onClick={() => update('Approved')} disabled={saving} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50">Approve</button>
            <button onClick={() => update('Rejected')} disabled={saving} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50">Reject</button>
          </>
        )}
      </div>
    </div>
  )
}