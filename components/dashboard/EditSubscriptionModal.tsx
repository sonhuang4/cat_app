'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Subscription } from '@/types'
import { FREQUENCY_OPTIONS } from '@/lib/constants'

interface EditSubscriptionModalProps {
  subscription: Subscription | null
  isOpen: boolean
  onClose: () => void
  onSave: (subscriptionId: string, updates: Partial<Subscription>) => void
}

export default function EditSubscriptionModal({
  subscription,
  isOpen,
  onClose,
  onSave,
}: EditSubscriptionModalProps) {
  const [currentTab, setCurrentTab] = useState<'pet' | 'frequency'>('pet')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: subscription ? {
      petName: subscription.petProfile.name,
      petAge: subscription.petProfile.age,
      petWeight: subscription.petProfile.weight,
      frequency: subscription.frequency.weeks.toString(),
    } : {},
  })

  const onSubmit = (data: any) => {
    if (!subscription) return

    const updates: Partial<Subscription> = {
      petProfile: {
        ...subscription.petProfile,
        name: data.petName,
        age: parseInt(data.petAge),
        weight: parseFloat(data.petWeight),
      },
      frequency: FREQUENCY_OPTIONS.find(f => f.weeks === parseInt(data.frequency)) || subscription.frequency,
    }

    onSave(subscription.id, updates)
    onClose()
  }

  if (!subscription) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md relative z-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Edit Subscription</h3>
              <button
                onClick={onClose}
                className="text-brand-neutral-400 hover:text-brand-neutral-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex mb-6 bg-brand-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentTab('pet')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'pet'
                    ? 'bg-white text-brand-coral shadow-sm'
                    : 'text-brand-neutral-600 hover:text-brand-neutral-800'
                }`}
              >
                Pet Info
              </button>
              <button
                onClick={() => setCurrentTab('frequency')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'frequency'
                    ? 'bg-white text-brand-coral shadow-sm'
                    : 'text-brand-neutral-600 hover:text-brand-neutral-800'
                }`}
              >
                Frequency
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {currentTab === 'pet' && (
                <>
                  <Input
                    label="Pet Name"
                    {...register('petName', { required: 'Pet name is required' })}
                    error={errors.petName?.message as string}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Age (years)"
                      type="number"
                      {...register('petAge', { 
                        required: 'Age is required',
                        min: { value: 0, message: 'Age must be positive' }
                      })}
                      error={errors.petAge?.message as string}
                    />
                    
                    <Input
                      label="Weight (lbs)"
                      type="number"
                      step="0.1"
                      {...register('petWeight', { 
                        required: 'Weight is required',
                        min: { value: 0.1, message: 'Weight must be positive' }
                      })}
                      error={errors.petWeight?.message as string}
                    />
                  </div>
                </>
              )}

              {currentTab === 'frequency' && (
                <Select
                  label="Delivery Frequency"
                  options={FREQUENCY_OPTIONS.map(option => ({
                    value: option.weeks.toString(),
                    label: `${option.label} (${option.discount}% off)`,
                  }))}
                  {...register('frequency', { required: 'Frequency is required' })}
                  error={errors.frequency?.message as string}
                />
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}