import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'

const fetchProducts = async (type?: 'litter' | 'food'): Promise<Product[]> => {
  const url = type ? `/api/products?type=${type}` : '/api/products'
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export const useProducts = (type?: 'litter' | 'food') => {
  return useQuery(['products', type], () => fetchProducts(type))
}

export const useLitterProducts = () => useProducts('litter')
export const useFoodProducts = () => useProducts('food')