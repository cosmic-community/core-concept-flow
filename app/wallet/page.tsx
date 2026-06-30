import { getSiteSettings } from '@/lib/cosmic'
import WalletTopUpForm from '@/components/WalletTopUpForm'

export const revalidate = 60

export default async function WalletPage() {
  const settings = await getSiteSettings()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="glass rounded-2xl p-6 border border-white/10 mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">PixelChowk Wallet Balance</p>
          <p className="text-3xl font-extrabold gradient-text">₹0</p>
        </div>
        <span className="text-4xl">💳</span>
      </div>

      <h1 className="text-2xl font-bold text-white mb-6">Top Up Your Wallet</h1>
      <WalletTopUpForm qrCode={settings?.metadata?.upi_qr_code} />
    </div>
  )
}