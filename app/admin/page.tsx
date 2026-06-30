import { getOrders, getWalletTopUps } from '@/lib/cosmic'
import AdminPanel from '@/components/AdminPanel'

export const revalidate = 10

export default async function AdminPage() {
  const [orders, topups] = await Promise.all([getOrders(), getWalletTopUps()])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-extrabold gradient-text mb-1">Admin Dashboard</h1>
      <p className="text-gray-400 mb-8">Verify payments and unlock Steam credentials for customers.</p>
      <AdminPanel orders={orders} topups={topups} />
    </div>
  )
}