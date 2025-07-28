'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProductCard from './ProductCard'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[] | undefined
  isLoading: boolean
  onAddToBox?: (product: Product) => void
}

export default function ProductGrid({ products, isLoading, onAddToBox }: ProductGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonLoader key={index} variant="card" />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-brand-neutral-600">No products found.</p>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} onAddToBox={onAddToBox} />
        </motion.div>
      ))}
    </motion.div>
  )
}