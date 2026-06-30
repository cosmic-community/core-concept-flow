import type { WhyFeature } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

const defaults: WhyFeature[] = [
  { title: 'Instant Activation', description: 'Get your Steam credentials minutes after approval.', icon: '⚡' },
  { title: 'Premium Quality', description: 'Genuine accounts with top-rated popular games.', icon: '💎' },
  { title: 'Lifetime Support', description: '24/7 WhatsApp & Instagram support for Steam Guard.', icon: '🛡️' }
]

export default function WhySection({ features }: { features?: WhyFeature[] }) {
  const list = features && features.length > 0 ? features : defaults

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-6">Why PixelChowk?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {list.map((f, i) => (
          <div key={i} className="glass rounded-2xl p-6 border border-white/10 hover:border-neon-purple/40 transition animate-fadeUp">
            <div className="text-3xl mb-3">{getMetafieldValue(f.icon) || '✨'}</div>
            <h3 className="font-semibold text-white">{getMetafieldValue(f.title)}</h3>
            <p className="text-sm text-gray-400 mt-1.5">{getMetafieldValue(f.description)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}