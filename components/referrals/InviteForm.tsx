'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useSendReferralInvite } from '@/hooks/useReferrals'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const inviteSchema = z.object({
  emails: z.string().min(1, 'At least one email is required'),
})

type InviteFormData = z.infer<typeof inviteSchema>

export default function InviteForm() {
  const [successMessage, setSuccessMessage] = useState('')
  const { mutate: sendInvite, isPending } = useSendReferralInvite()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  })

  const onSubmit = (data: InviteFormData) => {
    const emails = data.emails
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0)

    // For demo purposes, we'll just send the first email
    if (emails.length > 0) {
      sendInvite(emails[0], {
        onSuccess: (response) => {
          setSuccessMessage(`Invitation sent successfully! 🎉`)
          reset()
          setTimeout(() => setSuccessMessage(''), 5000)
        },
        onError: (error) => {
          console.error('Failed to send invitation:', error)
        },
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Invite Friends via Email</h3>
        <p className="text-brand-neutral-600 mb-6">
          Send personal invitations to your friends and family. They'll get $10 off their first order!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Addresses"
            placeholder="friend@example.com, another@example.com"
            {...register('emails')}
            error={errors.emails?.message}
            className="w-full"
          />
          <p className="text-sm text-brand-neutral-500">
            Separate multiple email addresses with commas
          </p>

          <Button
            type="submit"
            className="w-full md:w-auto"
            isLoading={isPending}
          >
            {isPending ? 'Sending Invitations...' : 'Send Invitations'}
          </Button>
        </form>

        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p className="text-green-800">{successMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Pre-written message template */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Email Template Preview</h3>
        <div className="bg-brand-beige-dark p-4 rounded-lg text-sm">
          <p className="mb-3"><strong>Subject:</strong> Try CatBox - $10 off your first order!</p>
          <div className="space-y-3 text-brand-neutral-700">
            <p>Hi there!</p>
            <p>
              I've been using CatBox for my cat's litter and food deliveries, and I absolutely love it! 
              They deliver premium products right to your door, and I never have to worry about running out.
            </p>
            <p>
              I thought you might be interested too, especially since you can get <strong>$10 off your first order</strong> with my referral code.
            </p>
            <p>
              Check it out: <span className="text-brand-coral font-mono">REFERRAL_CODE</span>
            </p>
            <p>Let me know what you think!</p>
            <p>Best,<br />Your Friend</p>
          </div>
        </div>
      </Card>
    </div>
  )
}