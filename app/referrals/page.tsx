'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReferrals } from '@/hooks/useReferrals'
import ReferralInfo from '@/components/referrals/ReferralInfo'
import InviteForm from '@/components/referrals/InviteForm'
import ReferralStats from '@/components/referrals/ReferralStats'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function ReferralsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invite' | 'stats'>('overview')
  const { data: referral, isLoading } = useReferrals()

  if (isLoading) {
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

  if (!referral) {
    return (
      <div className="min-h-screen bg-brand-beige py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Unable to load referral data</h1>
            <p className="text-brand-neutral-600">Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      id: 'invite', 
      label: 'Invite Friends', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'stats', 
      label: 'Stats & Rewards', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
  ] as const

  return (
    <div className="min-h-screen bg-brand-beige py-8">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Refer Friends & Earn Rewards
            </h1>
            <p className="text-lg text-brand-neutral-600">
              Share CatBox with your friends and both of you save $10! 
              The more you share, the more you earn.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-brand-coral text-white shadow-md'
                      : 'text-brand-neutral-600 hover:text-brand-coral'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <ReferralInfo referral={referral} />}
            {activeTab === 'invite' && <InviteForm />}
            {activeTab === 'stats' && <ReferralStats referral={referral} />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}