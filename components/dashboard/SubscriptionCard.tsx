'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Subscription } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'

interface SubscriptionCardProps {
  subscription: Subscription
  onEdit: (subscription: Subscription) => void
  onPause: (subscriptionId: string) => void
  onResume: (subscriptionId: string) => void
  onCancel: (subscriptionId: string) => void
}

export default function SubscriptionCard({
  subscription,
  onEdit,
  onPause,
  onResume,
  onCancel,
}: SubscriptionCardProps) {
  const [showActions, setShowActions] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'cancelled':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold mb-1">
              {subscription.petProfile.name}'s Box
            </h4>
            <Badge variant={getStatusColor(subscription.status)} className="capitalize">
              {subscription.status}
            </Badge>
          </div>
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-brand-neutral-400 hover:text-brand-neutral-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {subscription.litterProduct && (
            <div className="flex items-center gap-3">
              <img
                src={subscription.litterProduct.image}
                alt={subscription.litterProduct.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <p className="font-medium text-sm">{subscription.litterProduct.name}</p>
                <p className="text-xs text-brand-neutral-500">{subscription.litterProduct.brand}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(subscription.litterProduct.price)}</p>
            </div>
          )}

          {subscription.foodProduct && (
            <div className="flex items-center gap-3">
              <img
                src={subscription.foodProduct.image}
                alt={subscription.foodProduct.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <p className="font-medium text-sm">{subscription.foodProduct.name}</p>
                <p className="text-xs text-brand-neutral-500">{subscription.foodProduct.brand}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(subscription.foodProduct.price)}</p>
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Delivery Frequency</span>
            <span>{subscription.frequency.label}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Next Delivery</span>
            <span>{formatDate(subscription.nextDelivery)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total per delivery</span>
            <span className="text-brand-coral">{formatPrice(subscription.totalPrice)}</span>
          </div>
        </div>

        {showActions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t mt-4 pt-4 space-y-2"
          >
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(subscription)}
                className="w-full"
              >
                Edit
              </Button>
              {subscription.status === 'active' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPause(subscription.id)}
                  className="w-full"
                >
                  Pause
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onResume(subscription.id)}
                  className="w-full"
                >
                  Resume
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCancel(subscription.id)}
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Cancel Subscription
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}