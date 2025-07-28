'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

const highlights = [
  {
    id: 1,
    category: 'Premium Litter',
    title: 'Eco-Friendly Clay Litter',
    price: 24.99,
    image: 'https://placekitten.com/400/300',
    features: ['99.9% Dust Free', 'Odor Control', 'Clumping'],
    badge: 'Best Seller',
  },
  {
    id: 2,
    category: 'Gourmet Food',
    title: 'Wild Salmon Recipe',
    price: 32.99,
    image: 'https://placekitten.com/401/300',
    features: ['Grain Free', 'High Protein', 'Omega 3'],
    badge: 'New',
  },
  {
    id: 3,
    category: 'Natural Litter',
    title: 'Pine Wood Pellets',
    price: 19.99,
    image: 'https://placekitten.com/402/300',
    features: ['Biodegradable', 'Low Tracking', 'Natural'],
    badge: 'Eco Choice',
  },
]

export default function ProductHighlights() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-brand-neutral-600 max-w-2xl mx-auto">
            Discover our most popular products loved by cats and their humans
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {highlights.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    variant={product.badge === 'Best Seller' ? 'coral' : 'teal'}
                    className="absolute top-4 right-4"
                  >
                    {product.badge}
                  </Badge>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-brand-neutral-500 mb-1">{product.category}</p>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-2xl font-bold text-brand-coral mb-4">${product.price}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature) => (
                      <Badge key={feature} variant="default">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="secondary" className="mt-auto w-full">
                    Add to Box
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/products">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}