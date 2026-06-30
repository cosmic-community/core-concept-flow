import { createBucketClient } from '@cosmicjs/sdk'
import type { Game, Order, WalletTopUp, HeroSlide, SiteSettings } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getGames(): Promise<Game[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'games' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Game[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch games')
  }
}

export async function getGame(slug: string): Promise<Game | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'games', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Game
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch game')
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hero-slides' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const slides = response.objects as HeroSlide[]
    return slides.sort(
      (a, b) => (a.metadata?.display_order || 0) - (b.metadata?.display_order || 0)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch hero slides')
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'site-settings' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const objects = response.objects as SiteSettings[]
    return objects[0] || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch site settings')
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'orders' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const orders = response.objects as Order[]
    return orders.sort((a, b) => {
      const dateA = new Date(a.metadata?.order_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.order_date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch orders')
  }
}

export async function getWalletTopUps(): Promise<WalletTopUp[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'wallet-top-ups' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const topups = response.objects as WalletTopUp[]
    return topups.sort((a, b) => {
      const dateA = new Date(a.metadata?.request_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.request_date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch wallet top-ups')
  }
}