'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Button from '@/components/ui/Button'
import { Product } from '@/types'
import Link from 'next/link'

interface FilterState {
  brand: string
  priceRange: string
  sortBy: string
}

export default function ProductsPage() {
  const [currentType, setCurrentType] = useState<'all' | 'litter' | 'food'>('all')
  const [filters, setFilters] = useState<FilterState>({
    brand: '',
    priceRange: '',
    sortBy: 'name',
  })

  const { data: products, isLoading } = useProducts()
  const { setLitterProduct, setFoodProduct } = useSubscriptionStore()

  const filteredProducts = useMemo(() => {
    if (!products) return []

    let filtered = products

    // Filter by type
    if (currentType !== 'all') {
      filtered = filtered.filter(p => p.type === currentType)
    }

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(p => p.brand === filters.brand)
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      if (max) {
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
      } else {
        filtered = filtered.filter(p => p.price >= min)
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'brand':
          return a.brand.localeCompare(b.brand)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, currentType, filters])

  const handleAddToBox = (product: Product) => {
    if (product.type === 'litter') {
      setLitterProduct(product)
    } else {
      setFoodProduct(product)
    }
    
    // Show success message or navigate to build-box
    // For now, we'll just log it
    console.log(`Added ${product.name} to box`)
  }

  return (
    <div className="min-h-screen bg-brand-beige">
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shop Premium Cat Products</h1>
          <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto mb-8">
            Discover our curated selection of premium cat litters and foods, 
            all available with convenient subscription delivery.
          </p>
          <Link href="/build-box">
            <Button size="lg">
              Build Your Custom Box
            </Button>
          </Link>
        </motion.div>

        <ProductFilters
          onFilterChange={setFilters}
          currentType={currentType}
          onTypeChange={setCurrentType}
        />

        <div className="mb-6">
          <p className="text-brand-neutral-600">
            {isLoading
              ? 'Loading products...'
              : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          onAddToBox={handleAddToBox}
        />

        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-brand-neutral-600 mb-6">
              Try adjusting your filters or browse all products.
            </p>
            <Button onClick={() => {
              setFilters({ brand: '', priceRange: '', sortBy: 'name' })
              setCurrentType('all')
            }}>
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}