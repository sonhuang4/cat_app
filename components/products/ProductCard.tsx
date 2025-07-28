'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onAddToBox?: (product: Product) => void
}

export default function ProductCard({ product, onAddToBox }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge
          variant={product.type === 'litter' ? 'coral' : 'teal'}
          className="absolute top-4 right-4 capitalize"
        >
          {product.type}
        </Badge>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-sm text-brand-neutral-500">{product.brand}</p>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </div>
        
        <p className="text-brand-neutral-600 text-sm mb-4 flex-grow">
          {product.description}
        </p>
        
        {product.weight && (
          <p className="text-sm text-brand-neutral-500 mb-2">Weight: {product.weight}</p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features?.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="default" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-brand-coral">
            {formatPrice(product.price)}
          </span>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAddToBox?.(product)}
          >
            Add to Box
          </Button>
        </div>
        
        {product.frequencyOptions.length > 0 && (
          <p className="text-xs text-brand-neutral-500 mt-2">
            Save up to {Math.max(...product.frequencyOptions.map(o => o.discount))}% with subscription
          </p>
        )}
      </div>
    </Card>
  )
}