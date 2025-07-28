import { NextResponse } from 'next/server'
import { Subscription } from '@/types'

export async function GET() {
  // Mock subscription data
  const mockSubscriptions: Subscription[] = [
    {
      id: 'sub-1',
      userId: '1',
      petProfile: {
        name: 'Whiskers',
        age: 3,
        weight: 10,
        activityLevel: 'medium',
        healthConcerns: ['Sensitive stomach'],
        preferences: ['Grain-free', 'Low dust litter'],
      },
      litterProduct: {
        id: 'litter-1',
        name: 'Premium Clay Clumping Litter',
        type: 'litter',
        description: 'Ultra-absorbent clay litter with superior odor control.',
        price: 24.99,
        image: 'https://placekitten.com/400/300',
        brand: 'PurrFect Choice',
        weight: '20 lbs',
        features: ['99.9% Dust Free', 'Superior Clumping'],
        frequencyOptions: [],
      },
      foodProduct: {
        id: 'food-1',
        name: 'Wild Salmon Recipe',
        type: 'food',
        description: 'Premium grain-free dry food with wild-caught salmon.',
        price: 32.99,
        image: 'https://placekitten.com/403/300',
        brand: 'Feline Feast',
        weight: '10 lbs',
        features: ['Grain Free', 'High Protein'],
        frequencyOptions: [],
      },
      frequency: { weeks: 3, label: 'Every 3 weeks', discount: 10 },
      status: 'active',
      nextDelivery: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      totalPrice: 52.18,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  ]
  
  return NextResponse.json(mockSubscriptions)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Mock creating a new subscription
  const newSubscription: Subscription = {
    id: `sub-${Date.now()}`,
    userId: '1',
    ...body,
    status: 'active',
    nextDelivery: new Date(Date.now() + body.frequency.weeks * 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  }
  
  return NextResponse.json(newSubscription, { status: 201 })
}

export async function PUT(request: Request) {
  const body = await request.json()
  
  // Mock updating a subscription
  return NextResponse.json({
    ...body,
    updatedAt: new Date(),
  })
}