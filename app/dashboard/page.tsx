'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSubscriptions, useUpdateSubscription } from '@/hooks/useSubscription'
import { useUser } from '@/hooks/useUser'
import DashboardCard from '@/components/dashboard/DashboardCard'
import SubscriptionCard from '@/components/dashboard/SubscriptionCard'
import EditSubscriptionModal from '@/components/dashboard/EditSubscriptionModal'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { Subscription } from '@/types'
import Link from 'next/link'

function DashboardPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isWelcome = searchParams.get('welcome') === 'true'
  
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [showWelcome, setShowWelcome] = useState(isWelcome)

  const { data: subscriptions, isLoading: subscriptionsLoading } = useSubscriptions()
  const { data: user, isLoading: userLoading } = useUser()
  const { mutate: updateSubscription } = useUpdateSubscription()

  useEffect(() => {
    if (isWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isWelcome])

  const handleEditSubscription = (subscription: Subscription) => {
    setEditingSubscription(subscription)
  }

  const handleSaveSubscription = (subscriptionId: string, updates: Partial<Subscription>) => {
    updateSubscription({ id: subscriptionId, ...updates })
  }

  const handlePauseSubscription = (subscriptionId: string) => {
    updateSubscription({ id: subscriptionId, status: 'paused' })
  }

  const handleResumeSubscription = (subscriptionId: string) => {
    updateSubscription({ id: subscriptionId, status: 'active' })
  }

  const handleCancelSubscription = (subscriptionId: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      updateSubscription({ id: subscriptionId, status: 'cancelled' })
    }
  }

  if (userLoading || subscriptionsLoading) {
    return (
      <div className="min-h-screen bg-brand-beige py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <SkeletonLoader className="h-32" />
            <SkeletonLoader className="h-64" />
            <SkeletonLoader className="h-48" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-beige py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-brand-coral to-brand-teal text-white rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  <svg className="w-10 h-10 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Welcome to CatBox!</h2>
                  <p className="text-white/90">
                    Your subscription has been created successfully. Your first delivery will arrive soon!
                  </p>
                </div>
                <button
                  onClick={() => setShowWelcome(false)}
                  className="ml-auto text-white/80 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back{user?.name ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-brand-neutral-600">
              Manage your subscriptions and keep your cats happy
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard title="Active Subscriptions">
                <div className="text-3xl font-bold text-brand-coral">
                  {subscriptions?.filter(s => s.status === 'active').length || 0}
                </div>
              </DashboardCard>

              <DashboardCard title="Total Savings">
                <div className="text-3xl font-bold text-brand-teal">
                  ${subscriptions?.reduce((total, sub) => {
                    const originalPrice = (sub.litterProduct?.price || 0) + (sub.foodProduct?.price || 0)
                    const discount = originalPrice * (sub.frequency.discount / 100)
                    return total + discount
                  }, 0).toFixed(2) || '0.00'}
                </div>
                <p className="text-sm text-brand-neutral-500">This month</p>
              </DashboardCard>

              <DashboardCard title="Referral Code">
                <div className="text-xl font-bold text-brand-coral mb-2">
                  {user?.referralCode || 'LOADING'}
                </div>
                <Link href="/referrals">
                  <Button size="sm" variant="outline">
                    Share & Earn
                  </Button>
                </Link>
              </DashboardCard>
            </div>

            {/* Subscriptions */}
            <DashboardCard
              title="Your Subscriptions"
              action={
                <Link href="/build-box">
                  <Button size="sm">
                    Add Subscription
                  </Button>
                </Link>
              }
            >
              {!subscriptions || subscriptions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 text-brand-coral">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No subscriptions yet</h3>
                  <p className="text-brand-neutral-600 mb-6">
                    Get started by creating your first CatBox subscription
                  </p>
                  <Link href="/build-box">
                    <Button>Build Your First Box</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {subscriptions.map((subscription) => (
                    <SubscriptionCard
                      key={subscription.id}
                      subscription={subscription}
                      onEdit={handleEditSubscription}
                      onPause={handlePauseSubscription}
                      onResume={handleResumeSubscription}
                      onCancel={handleCancelSubscription}
                    />
                  ))}
                </div>
              )}
            </DashboardCard>

            {/* Recent Activity */}
            <DashboardCard title="Recent Activity">
              <div className="space-y-4">
                {subscriptions?.slice(0, 3).map((subscription) => (
                  <div key={subscription.id} className="flex items-center gap-4 p-3 bg-brand-beige-dark rounded-lg">
                    <div className="w-8 h-8 bg-brand-coral rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">Subscription created for {subscription.petProfile.name}</p>
                      <p className="text-sm text-brand-neutral-500">
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-brand-neutral-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>

      <EditSubscriptionModal
        subscription={editingSubscription}
        isOpen={!!editingSubscription}
        onClose={() => setEditingSubscription(null)}
        onSave={handleSaveSubscription}
      />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardPageContent />
    </Suspense>
  );
}