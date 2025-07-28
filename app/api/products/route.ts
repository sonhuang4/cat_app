import { NextResponse } from 'next/server'
import { Product } from '@/types'

const mockProducts: Product[] = [
  // Litter Products
  {
    id: 'litter-1',
    name: 'Premium Clay Clumping Litter',
    type: 'litter',
    description: 'Ultra-absorbent clay litter with superior odor control and minimal dust.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=300&fit=crop',
    brand: 'PurrFect Choice',
    weight: '20 lbs',
    features: ['99.9% Dust Free', 'Superior Clumping', '7-Day Odor Control', 'Low Tracking'],
    frequencyOptions: [
      { weeks: 2, label: 'Every 2 weeks', discount: 15 },
      { weeks: 3, label: 'Every 3 weeks', discount: 10 },
      { weeks: 4, label: 'Every 4 weeks', discount: 5 },
    ],
  },
  {
    id: 'litter-2',
    name: 'Natural Pine Wood Pellets',
    type: 'litter',
    description: 'Eco-friendly pine pellets that naturally control odors and are biodegradable.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=400&h=300&fit=crop',
    brand: 'EcoPaws',
    weight: '15 lbs',
    features: ['100% Biodegradable', 'Natural Odor Control', 'Low Dust', 'Compostable'],
    frequencyOptions: [
      { weeks: 2, label: 'Every 2 weeks', discount: 15 },
      { weeks: 3, label: 'Every 3 weeks', discount: 10 },
      { weeks: 4, label: 'Every 4 weeks', discount: 5 },
    ],
  },
  {
    id: 'litter-3',
    name: 'Crystal Silica Gel Litter',
    type: 'litter',
    description: 'Long-lasting crystal litter that absorbs moisture and locks in odors.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=300&fit=crop',
    brand: 'CrystalClear',
    weight: '8 lbs',
    features: ['Lasts 30 Days', 'No Scooping Needed', 'Ultra Absorbent', 'Unscented'],
    frequencyOptions: [
      { weeks: 4, label: 'Every 4 weeks', discount: 10 },
      { weeks: 6, label: 'Every 6 weeks', discount: 5 },
    ],
  },
  // Food Products
  {
    id: 'food-1',
    name: 'Wild Salmon Recipe',
    type: 'food',
    description: 'Premium grain-free dry food with wild-caught salmon as the first ingredient.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
    brand: 'Feline Feast',
    weight: '10 lbs',
    ingredients: ['Wild Salmon', 'Sweet Potato', 'Peas', 'Chicken Meal', 'Natural Flavors'],
    features: ['Grain Free', 'High Protein', 'Omega 3 & 6', 'No By-Products'],
    frequencyOptions: [
      { weeks: 3, label: 'Every 3 weeks', discount: 15 },
      { weeks: 4, label: 'Every 4 weeks', discount: 10 },
      { weeks: 6, label: 'Every 6 weeks', discount: 5 },
    ],
  },
  {
    id: 'food-2',
    name: 'Indoor Cat Chicken Formula',
    type: 'food',
    description: 'Specially formulated for indoor cats with controlled calories and hairball control.',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    brand: 'Healthy Paws',
    weight: '12 lbs',
    ingredients: ['Chicken', 'Brown Rice', 'Barley', 'Oatmeal', 'Natural Fibers'],
    features: ['Indoor Formula', 'Hairball Control', 'Weight Management', 'Prebiotics'],
    frequencyOptions: [
      { weeks: 3, label: 'Every 3 weeks', discount: 15 },
      { weeks: 4, label: 'Every 4 weeks', discount: 10 },
      { weeks: 6, label: 'Every 6 weeks', discount: 5 },
    ],
  },
  {
    id: 'food-3',
    name: 'Senior Cat Turkey & Rice',
    type: 'food',
    description: 'Age-defying nutrition for senior cats with joint support and easy digestion.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    brand: 'Senior Whiskers',
    weight: '8 lbs',
    ingredients: ['Turkey', 'White Rice', 'Chicken Broth', 'Carrots', 'Glucosamine'],
    features: ['Senior Formula', 'Joint Support', 'Easy Digestion', 'Added Vitamins'],
    frequencyOptions: [
      { weeks: 3, label: 'Every 3 weeks', discount: 15 },
      { weeks: 4, label: 'Every 4 weeks', discount: 10 },
      { weeks: 6, label: 'Every 6 weeks', discount: 5 },
    ],
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  let products = mockProducts
  
  if (type && (type === 'litter' || type === 'food')) {
    products = products.filter(p => p.type === type)
  }
  
  return NextResponse.json(products)
}