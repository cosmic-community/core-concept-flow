'use client'

import { useState, useMemo } from 'react'
import type { Game } from '@/types'
import GameCard from '@/components/GameCard'
import { getMetafieldValue } from '@/lib/cosmic'

const genres = ['All', 'Action & Adventure', 'RPG & Open World', 'Racing & Simulation', 'Sports & Fighting', 'Shooters']
const brackets = ['All', 'Under ₹100', '₹100 - ₹149', '₹150 & Above']
const sorts = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name: A to Z']

export default function StoreFilters({ games }: { games: Game[] }) {
  const [genre, setGenre] = useState('All')
  const [bracket, setBracket] = useState('All')
  const [sort, setSort] = useState('Default')

  const filtered = useMemo(() => {
    let list = [...games]
    if (genre !== 'All') {
      list = list.filter((g) => getMetafieldValue(g.metadata?.genre) === genre)
    }
    if (bracket !== 'All') {
      list = list.filter((g) => getMetafieldValue(g.metadata?.price_bracket) === bracket)
    }
    if (sort === 'Price: Low to High') {
      list.sort((a, b) => (a.metadata?.price ?? 0) - (b.metadata?.price ?? 0))
    } else if (sort === 'Price: High to Low') {
      list.sort((a, b) => (b.metadata?.price ?? 0) - (a.metadata?.price ?? 0))
    } else if (sort === 'Name: A to Z') {
      list.sort((a, b) => {
        const ta = getMetafieldValue(a.metadata?.game_title) || a.title
        const tb = getMetafieldValue(b.metadata?.game_title) || b.title
        return ta.localeCompare(tb)
      })
    }
    return list
  }, [games, genre, bracket, sort])

  return (
    <div>
      <div className="glass rounded-2xl p-4 border border-white/10 flex flex-col lg:flex-row gap-4 mb-8">
        <FilterGroup label="Genre" options={genres} value={genre} onChange={setGenre} />
        <FilterGroup label="Price" options={brackets} value={bracket} onChange={setBracket} />
        <div className="lg:ml-auto">
          <label className="block text-xs text-gray-400 mb-1.5">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-base-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:border-neon-blue outline-none"
          >
            {sorts.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No games match your filters.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filtered.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              value === o
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}