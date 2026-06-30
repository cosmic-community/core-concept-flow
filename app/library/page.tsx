import { getOrders } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import CredentialReveal from '@/components/CredentialReveal'

export const revalidate = 30

export default async function LibraryPage() {
  const orders = await getOrders()
  const approved = orders.filter((o) => getMetafieldValue(o.metadata?.status) === 'Approved')
  const pending = orders.filter((o) => getMetafieldValue(o.metadata?.status) === 'Pending')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-extrabold gradient-text mb-1">My Library</h1>
      <p className="text-gray-400 mb-8">Tap an activated game to reveal your Steam credentials.</p>

      {approved.length === 0 && pending.length === 0 && (
        <div className="glass rounded-2xl p-10 text-center border border-white/10">
          <p className="text-gray-400">No orders yet. Head to the store to buy a game!</p>
        </div>
      )}

      {approved.length > 0 && (
        <div className="space-y-4 mb-8">
          {approved.map((o) => <CredentialReveal key={o.id} order={o} />)}
        </div>
      )}

      {pending.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-400 mb-3">Awaiting Approval (15-30 mins)</h2>
          <div className="space-y-3">
            {pending.map((o) => {
              const game = o.metadata?.game
              const gameTitle = game ? (getMetafieldValue(game.metadata?.game_title) || game.title) : 'Game'
              return (
                <div key={o.id} className="glass rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
                  <span className="text-gray-200 text-sm">{gameTitle}</span>
                  <span className="ml-auto text-xs text-yellow-400 font-medium">VERIFYING</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}