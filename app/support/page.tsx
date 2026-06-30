import { getSiteSettings } from '@/lib/cosmic'
import SupportLinks from '@/components/SupportLinks'

export const revalidate = 60

export default async function SupportPage() {
  const settings = await getSiteSettings()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-extrabold gradient-text mb-1">Live Chat Support</h1>
      <p className="text-gray-400 mb-8">Community links and direct admin support routing.</p>
      <SupportLinks settings={settings} />
    </div>
  )
}