'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useFoodProducts } from '@/hooks/useProducts'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface FoodSelectionStepProps {
  selectedProduct?: Product | null
  onNext: (product: Product | null) => void
  onBack: () => void
}

export default function FoodSelectionStep({ selectedProduct, onNext, onBack }: FoodSelectionStepProps) {
  const [selected, setSelected] = useState<Product | null>(selectedProduct || null)
  const { data: foodProducts, isLoading } = useFoodProducts()

  const handleNext = () => {
    onNext(selected)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Cat's Food</h2>
        <p className="text-brand-neutral-600">
          Select a premium food or skip this step if you prefer to handle food separately
        </p>
      </div>

      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelected(null)}
          className={selected === null ? 'ring-2 ring-brand-teal' : ''}
        >
          Skip Food (Litter Only)
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonLoader key={index} variant="card" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodProducts?.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  selected?.id === product.id
                    ? 'ring-2 ring-brand-teal shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelected(product)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  {selected?.id === product.id && (
                    <div className="absolute top-4 right-4 bg-brand-teal text-white rounded-full p-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.707 10.293a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <p className="text-sm text-brand-neutral-500">{product.brand}</p>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </div>
                  
                  <p className="text-brand-neutral-600 text-sm mb-3">
                    {product.description}
                  </p>
                  
                  <p className="text-sm text-brand-neutral-500 mb-3">
                    Weight: {product.weight}
                  </p>
                  
                  {product.ingredients && (
                    <div className="mb-3">
                      <p className="text-xs text-brand-neutral-500 mb-1">Main Ingredients:</p>
                      <p className="text-xs text-brand-neutral-600">
                        {product.ingredients.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features?.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="teal" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-teal">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-brand-neutral-500">
                      per delivery
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center pt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-center">
          {selected && (
            <p className="text-sm text-brand-neutral-600 mb-2">
              Selected: {selected.name}
            </p>
          )}
        </div>
        
        <Button onClick={handleNext} size="lg">
          Next: Set Frequency
        </Button>
      </div>
    </motion.div>
  )
}