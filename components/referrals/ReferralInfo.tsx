'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Referral } from '@/types'

interface ReferralInfoProps {
  referral: Referral
}

export default function ReferralInfo({ referral }: ReferralInfoProps) {
  const [copied, setCopied] = useState(false)

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referral.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareUrl = `https://catbox.com/?ref=${referral.code}`

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Referral Code Card */}
      <Card className="p-6 bg-gradient-to-r from-brand-coral to-brand-teal text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Your Referral Code</h3>
          <div className="text-4xl font-mono font-bold mb-4 tracking-wider">
            {referral.code}
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={copyReferralCode}
              className="bg-white text-brand-coral hover:bg-gray-100"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={copyShareUrl}
              className="bg-white text-brand-coral hover:bg-gray-100"
            >
              Copy Link
            </Button>
          </div>
        </div>
      </Card>

      {/* How It Works */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">How Referrals Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <h4 className="font-semibold mb-2">1. Share Your Code</h4>
            <p className="text-sm text-brand-neutral-600">
              Share your unique referral code with friends and family
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🛍️</span>
            </div>
            <h4 className="font-semibold mb-2">2. They Subscribe</h4>
            <p className="text-sm text-brand-neutral-600">
              When they create their first subscription using your code
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold mb-2">3. You Both Save</h4>
            <p className="text-sm text-brand-neutral-600">
              You get $10 off your next order, they get $10 off their first order
            </p>
          </div>
        </div>
      </Card>

      {/* Share Options */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Share Your Code</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex flex-col items-center p-4 border border-brand-neutral-200 rounded-lg hover:border-brand-coral transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span className="text-xs">Facebook</span>
          </button>

          <button
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out CatBox! Use my code ${referral.code} for $10 off your first order&url=${encodeURIComponent(shareUrl)}`, '_blank')}
            className="flex flex-col items-center p-4 border border-brand-neutral-200 rounded-lg hover:border-brand-coral transition-colors"
          >
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <span className="text-xs">Twitter</span>
          </button>

          <button
            onClick={() => window.open(`mailto:?subject=Try CatBox&body=Hey! I thought you might like CatBox - they deliver premium cat litter and food right to your door. Use my code ${referral.code} for $10 off your first order: ${shareUrl}`, '_blank')}
            className="flex flex-col items-center p-4 border border-brand-neutral-200 rounded-lg hover:border-brand-coral transition-colors"
          >
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs">Email</span>
          </button>

          <button
            onClick={copyShareUrl}
            className="flex flex-col items-center p-4 border border-brand-neutral-200 rounded-lg hover:border-brand-coral transition-colors"
          >
            <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs">Copy Link</span>
          </button>
        </div>
      </Card>
    </div>
  )
}