import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const { id, username, password, platform } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing order id' }, { status: 400 })
    }

    await cosmic.objects.updateOne(id, {
      metadata: {
        status: 'Approved',
        steam_username: username || '',
        steam_password: password || '',
        platform_details: platform || 'Steam Client'
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to approve order' }, { status: 500 })
  }
}