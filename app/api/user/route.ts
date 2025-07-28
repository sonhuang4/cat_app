import { NextResponse } from 'next/server'
import { User } from '@/types'

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  name: 'John Doe',
  referralCode: 'MEOW123',
  subscriptions: [
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
      nextDelivery: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
      totalPrice: 52.18, // After 10% discount
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    },
  ],
}

export async function GET() {
  return NextResponse.json(mockUser)
}

export async function PUT(request: Request) {
  const body = await request.json()
  // In a real app, this would update the user in the database
  return NextResponse.json({ ...mockUser, ...body })
}