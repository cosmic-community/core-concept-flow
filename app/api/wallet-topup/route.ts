import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const { amount, name, email, txnId } = await request.json()

    if (!name || !email || !txnId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await cosmic.objects.insertOne({
      title: `${name} - ₹${amount} Top-Up`,
      type: 'wallet-top-ups',
      metadata: {
        customer_name: name,
        customer_email: email,
        amount: Number(amount),
        transaction_id: txnId,
        status: 'Pending',
        request_date: new Date().toISOString().split('T')[0]
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit top-up' }, { status: 500 })
  }
}