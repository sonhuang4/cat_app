'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Referral } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ReferralStatsProps {
  referral: Referral
}

export default function ReferralStats({ referral }: ReferralStatsProps) {
  const totalEarned = referral.rewards.reduce((sum, reward) => sum + reward.amount, 0)
  const claimedRewards = referral.rewards.filter(r => r.status === 'claimed')
  const pendingRewards = referral.rewards.filter(r => r.status === 'pending')

  const conversionRate = referral.invitedCount > 0 
    ? ((referral.signedUpCount / referral.invitedCount) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-brand-coral mb-2">
            {referral.invitedCount}
          </div>
          <p className="text-brand-neutral-600">Friends Invited</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-brand-teal mb-2">
            {referral.signedUpCount}
          </div>
          <p className="text-brand-neutral-600">Successfully Signed Up</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-brand-coral mb-2">
            {conversionRate}%
          </div>
          <p className="text-brand-neutral-600">Conversion Rate</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {formatPrice(totalEarned)}
          </div>
          <p className="text-brand-neutral-600">Total Earned</p>
        </Card>
      </div>

      {/* Rewards History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Rewards History</h3>
          <div className="flex gap-2">
            <Badge variant="success">
              {claimedRewards.length} Claimed
            </Badge>
            <Badge variant="warning">
              {pendingRewards.length} Pending
            </Badge>
          </div>
        </div>

        {referral.rewards.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🎁</div>
            <h4 className="text-lg font-semibold mb-2">No rewards yet</h4>
            <p className="text-brand-neutral-600">
              Start referring friends to earn your first reward!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {referral.rewards.map((reward) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-brand-beige-dark rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    reward.status === 'claimed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {reward.status === 'claimed' ? '✓' : '⏳'}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {formatPrice(reward.amount)} {reward.type === 'discount' ? 'Discount' : 'Credit'}
                    </p>
                    <p className="text-sm text-brand-neutral-500">
                      Earned on {new Date(reward.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant={reward.status === 'claimed' ? 'success' : 'warning'}>
                  {reward.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Performance Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Referral Performance</h3>
        <div className="h-48 bg-brand-beige-dark rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-brand-neutral-600">
              Performance chart coming soon!
            </p>
          </div>
        </div>
      </Card>

      {/* Tips for Success */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Tips for Success</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-brand-coral">💬</span>
              Personal Touch
            </h4>
            <p className="text-sm text-brand-neutral-600">
              Share your personal experience with CatBox. What do you and your cat love most?
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-brand-teal">📱</span>
              Use Social Media
            </h4>
            <p className="text-sm text-brand-neutral-600">
              Share your referral code on social media with photos of your happy cat!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-brand-coral">👥</span>
              Target Cat Parents
            </h4>
            <p className="text-sm text-brand-neutral-600">
              Focus on friends and family who have cats - they're most likely to be interested.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-brand-teal">⏰</span>
              Perfect Timing
            </h4>
            <p className="text-sm text-brand-neutral-600">
              Share when friends mention running out of cat supplies or struggling with shopping.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}