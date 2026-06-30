import { getGames } from '@/lib/cosmic'
import StoreFilters from '@/components/StoreFilters'

export const revalidate = 60

export default async function StorePage() {
  const games = await getGames()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-extrabold gradient-text mb-1">Explore Store</h1>
      <p className="text-gray-400 mb-8">Filter by genre and budget-friendly price brackets.</p>
      <StoreFilters games={games} />
    </div>
  )
}