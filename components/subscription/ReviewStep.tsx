'use client'

import { motion } from 'framer-motion'
import { useCreateSubscription } from '@/hooks/useSubscription'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Product, PetProfile, FrequencyOption } from '@/types'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils'

interface ReviewStepProps {
  petProfile: PetProfile
  litterProduct: Product | null
  foodProduct: Product | null
  frequency: FrequencyOption
  onBack: () => void
  onComplete: () => void
}

export default function ReviewStep({
  petProfile,
  litterProduct,
  foodProduct,
  frequency,
  onBack,
  onComplete,
}: ReviewStepProps) {
  const { mutate: createSubscription, isPending } = useCreateSubscription()

  const subtotal = (litterProduct?.price || 0) + (foodProduct?.price || 0)
  const discount = subtotal * (frequency.discount / 100)
  const total = subtotal - discount

  const handleSubmit = () => {
    createSubscription({
      petProfile,
      litterProduct,
      foodProduct,
      frequency,
      totalPrice: total,
    }, {
      onSuccess: () => {
        onComplete()
      },
    })
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
        <h2 className="text-3xl font-bold mb-2">Review Your CatBox</h2>
        <p className="text-brand-neutral-600">
          Everything looks good? Let's get {petProfile.name}'s subscription started!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pet Profile */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>🐱</span>
              {petProfile.name}'s Profile
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-brand-neutral-500">Age</p>
                <p className="font-medium">{petProfile.age} years old</p>
              </div>
              <div>
                <p className="text-brand-neutral-500">Weight</p>
                <p className="font-medium">{petProfile.weight} lbs</p>
              </div>
              <div>
                <p className="text-brand-neutral-500">Activity Level</p>
                <p className="font-medium capitalize">{petProfile.activityLevel}</p>
              </div>
              <div>
                <p className="text-brand-neutral-500">Delivery</p>
                <p className="font-medium">{frequency.label}</p>
              </div>
            </div>
            {petProfile.healthConcerns.length > 0 && (
              <div className="mt-4">
                <p className="text-brand-neutral-500 text-sm mb-2">Health Concerns</p>
                <div className="flex flex-wrap gap-1">
                  {petProfile.healthConcerns.map((concern) => (
                    <Badge key={concern} variant="default" className="text-xs">
                      {concern}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Products */}
          <div className="space-y-4">
            {litterProduct && (
              <Card className="p-6">
                <div className="flex gap-4">
                  <img
                    src={litterProduct.image}
                    alt={litterProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-brand-neutral-500">{litterProduct.brand}</p>
                        <h4 className="font-semibold">{litterProduct.name}</h4>
                        <p className="text-sm text-brand-neutral-600 mt-1">
                          {litterProduct.weight}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(litterProduct.price)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {foodProduct && (
              <Card className="p-6">
                <div className="flex gap-4">
                  <img
                    src={foodProduct.image}
                    alt={foodProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-brand-neutral-500">{foodProduct.brand}</p>
                        <h4 className="font-semibold">{foodProduct.name}</h4>
                        <p className="text-sm text-brand-neutral-600 mt-1">
                          {foodProduct.weight}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(foodProduct.price)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-8">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {litterProduct && (
                <div className="flex justify-between text-sm">
                  <span>{litterProduct.name}</span>
                  <span>{formatPrice(litterProduct.price)}</span>
                </div>
              )}
              {foodProduct && (
                <div className="flex justify-between text-sm">
                  <span>{foodProduct.name}</span>
                  <span>{formatPrice(foodProduct.price)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {frequency.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Subscription Discount ({frequency.discount}%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total per delivery</span>
                <span className="text-brand-coral">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-brand-neutral-500 mt-1">
                Next delivery: {frequency.label.toLowerCase()}
              </p>
            </div>

            <div className="mt-6 p-4 bg-brand-beige-dark rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-brand-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
              </div>
              <p className="text-xs text-brand-neutral-600">
                Not happy? We'll make it right or refund your money.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <Button onClick={handleSubmit} size="lg" isLoading={isPending}>
          {isPending ? 'Creating Subscription...' : 'Start My Subscription'}
        </Button>
      </div>
    </motion.div>
  )
}