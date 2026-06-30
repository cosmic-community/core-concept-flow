import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await cosmic.objects.updateOne(id, {
      metadata: { status }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update top-up' }, { status: 500 })
  }
}