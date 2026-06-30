import { getGames, getHeroSlides, getSiteSettings } from '@/lib/cosmic'
import HeroSlider from '@/components/HeroSlider'
import GameCard from '@/components/GameCard'
import WhySection from '@/components/WhySection'
import LiveToast from '@/components/LiveToast'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [games, slides, settings] = await Promise.all([
    getGames(),
    getHeroSlides(),
    getSiteSettings()
  ])

  const recommended = games.filter((g) => g.metadata?.recommended).slice(0, 5)
  const featured = games.filter((g) => g.metadata?.featured_deal).slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <LiveToast />
      <HeroSlider slides={slides} />

      {recommended.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">🤖 Recommended For You</h2>
            <Link href="/store" className="text-sm text-neon-blue hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommended.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">🔥 Featured Deals</h2>
            <Link href="/store" className="text-sm text-neon-blue hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </section>
      )}

      {games.length > 0 && recommended.length === 0 && featured.length === 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">All Games</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {games.slice(0, 10).map((g) => <GameCard key={g.id} game={g} />)}
          </div>
        </section>
      )}

      <WhySection features={settings?.metadata?.why_features} />
    </div>
  )
}