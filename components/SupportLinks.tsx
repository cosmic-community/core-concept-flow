import type { SiteSettings } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function SupportLinks({ settings }: { settings: SiteSettings | null }) {
  const instagram = getMetafieldValue(settings?.metadata?.instagram_link)
  const wa1 = getMetafieldValue(settings?.metadata?.whatsapp_admin_1)
  const wa2 = getMetafieldValue(settings?.metadata?.whatsapp_admin_2)
  const wa3 = getMetafieldValue(settings?.metadata?.whatsapp_admin_3)
  const broadcast = getMetafieldValue(settings?.metadata?.live_broadcast)

  const whatsappAdmins = [wa1, wa2, wa3].filter(Boolean)

  return (
    <div className="space-y-6">
      {broadcast && (
        <div className="glass neon-border rounded-2xl p-4 flex items-center gap-3">
          <span className="text-xl">📢</span>
          <p className="text-sm text-gray-200">{broadcast}</p>
        </div>
      )}

      <div className="glass rounded-2xl p-6 border border-white/10">
        <h2 className="text-lg font-bold text-white mb-2">Live Chat & Steam Guard Support</h2>
        <p className="text-sm text-gray-400 mb-5">
          Need a 2FA/Steam Guard security code? Ping any admin directly on WhatsApp or message us on Instagram.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {whatsappAdmins.length > 0 ? (
            whatsappAdmins.map((wa, i) => (
              <a
                key={i}
                href={wa.startsWith('http') ? wa : `https://${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600/20 border border-green-500/40 text-green-300 font-medium text-sm hover:bg-green-600/30 transition"
              >
                💬 Admin {i + 1}
              </a>
            ))
          ) : (
            <p className="text-sm text-gray-500 col-span-3">WhatsApp admins not configured yet.</p>
          )}
        </div>

        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/40 text-neon-pink font-medium text-sm hover:opacity-90 transition"
          >
            📸 Message on Instagram
          </a>
        )}
      </div>
    </div>
  )
}