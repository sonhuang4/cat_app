import { NextResponse } from 'next/server'
import { Referral } from '@/types'

export async function GET() {
  const mockReferral: Referral = {
    code: 'MEOW123',
    userId: '1',
    invitedCount: 15,
    signedUpCount: 8,
    rewards: [
      {
        id: 'reward-1',
        amount: 10,
        type: 'discount',
        status: 'claimed',
        earnedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'reward-2',
        amount: 10,
        type: 'discount',
        status: 'claimed',
        earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'reward-3',
        amount: 10,
        type: 'discount',
        status: 'pending',
        earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  }
  
  return NextResponse.json(mockReferral)
}

export async function POST(request: Request) {
  const { email } = await request.json()
  
  // Mock sending referral invitation
  return NextResponse.json({
    success: true,
    message: `Invitation sent to ${email}`,
  })
}