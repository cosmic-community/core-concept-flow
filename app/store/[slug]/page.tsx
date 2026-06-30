// app/store/[slug]/page.tsx
import { getGame } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function GameDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = await getGame(slug)

  if (!game) notFound()

  const title = getMetafieldValue(game.metadata?.game_title) || game.title
  const poster = game.metadata?.poster_image
  const description = getMetafieldValue(game.metadata?.description)
  const genre = getMetafieldValue(game.metadata?.genre)
  const price = game.metadata?.price ?? 0
  const discount = game.metadata?.discount_percent ?? 0
  const stock = game.metadata?.stock_limit ?? 0

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/store" className="text-sm text-neon-blue hover:underline">← Back to Store</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="rounded-2xl overflow-hidden neon-border bg-base-dark">
          {poster?.imgix_url ? (
            <img
              src={`${poster.imgix_url}?w=1000&h=1333&fit=crop&auto=format,compress`}
              alt={title}
              width={500}
              height={666}
              className="w-full object-cover"
            />
          ) : (
            <div className="aspect-[3/4] flex items-center justify-center text-6xl">🎮</div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">{title}</h1>
          {genre && <p className="text-neon-purple mt-1">{genre}</p>}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-4xl font-bold gradient-text">₹{price}</span>
            {discount > 0 && (
              <span className="bg-neon-pink text-white text-sm font-bold px-2.5 py-1 rounded-full">-{discount}%</span>
            )}
          </div>
          {stock > 0 && <p className="text-xs text-gray-400 mt-2">In stock: {stock} accounts</p>}
          {description && <p className="text-gray-300 mt-5 leading-relaxed">{description}</p>}

          <div className="mt-6 glass rounded-2xl p-5 border border-white/10">
            <p className="text-sm text-gray-300">
              💡 Add funds to your wallet first, then purchase. After payment, your order goes to admin verification (15-30 mins). Once approved, your Steam credentials appear in <Link href="/library" className="text-neon-blue hover:underline">My Library</Link>.
            </p>
            <Link
              href="/wallet"
              className="mt-4 inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-sm hover:opacity-90 transition shadow-neon"
            >
              Go to Wallet →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}