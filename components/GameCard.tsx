import Link from 'next/link'
import type { Game } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function GameCard({ game }: { game: Game }) {
  const title = getMetafieldValue(game.metadata?.game_title) || game.title
  const poster = game.metadata?.poster_image
  const genre = getMetafieldValue(game.metadata?.genre)
  const price = game.metadata?.price ?? 0
  const discount = game.metadata?.discount_percent ?? 0
  const recommended = game.metadata?.recommended
  const featured = game.metadata?.featured_deal

  return (
    <Link
      href={`/store/${game.slug}`}
      className="group glass rounded-2xl overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all hover:shadow-neon"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-base-dark">
        {poster?.imgix_url ? (
          <img
            src={`${poster.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🎮</div>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-neon-pink text-white text-xs font-bold px-2 py-1 rounded-full shadow-purpleGlow">
            -{discount}%
          </span>
        )}
        {recommended && (
          <span className="absolute top-2 right-2 bg-neon-purple/80 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            🤖 PICK
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-white truncate">{title}</h3>
        {genre && <p className="text-xs text-gray-400 mt-0.5 truncate">{genre}</p>}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold gradient-text">₹{price}</span>
          {featured && <span className="text-[10px] text-neon-blue font-medium">DEAL</span>}
        </div>
      </div>
    </Link>
  )
}