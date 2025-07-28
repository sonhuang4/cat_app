'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { FrequencyOption } from '@/types'
import { FREQUENCY_OPTIONS } from '@/lib/constants'

interface FrequencyStepProps {
  selectedFrequency?: FrequencyOption | null
  onNext: (frequency: FrequencyOption) => void
  onBack: () => void
}

export default function FrequencyStep({ selectedFrequency, onNext, onBack }: FrequencyStepProps) {
  const [selected, setSelected] = useState<FrequencyOption | null>(selectedFrequency || null)

  const handleNext = () => {
    if (selected) {
      onNext(selected)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Delivery Frequency</h2>
        <p className="text-brand-neutral-600">
          How often would you like to receive your CatBox delivery? Save more with frequent deliveries!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {FREQUENCY_OPTIONS.map((option) => (
          <motion.div
            key={option.weeks}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 p-6 ${
                selected?.weeks === option.weeks
                  ? 'ring-2 ring-brand-coral shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelected(option)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{option.label}</h3>
                {selected?.weeks === option.weeks && (
                  <div className="bg-brand-coral text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15 3.707 10.293a1 1 0 011.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={option.discount > 0 ? 'success' : 'default'}>
                    {option.discount > 0 ? `${option.discount}% OFF` : 'Standard Price'}
                  </Badge>
                </div>
                
                <div className="text-sm text-brand-neutral-600">
                  <p>Perfect for:</p>
                  <ul className="mt-1 space-y-1">
                    {option.weeks === 2 && (
                      <>
                        <li>• Multiple cats</li>
                        <li>• Heavy litter users</li>
                        <li>• Maximum savings</li>
                      </>
                    )}
                    {option.weeks === 3 && (
                      <>
                        <li>• Single cat households</li>
                        <li>• Regular usage</li>
                        <li>• Great savings</li>
                      </>
                    )}
                    {option.weeks === 4 && (
                      <>
                        <li>• Light to moderate usage</li>
                        <li>• Good savings</li>
                        <li>• Standard frequency</li>
                      </>
                    )}
                    {option.weeks === 6 && (
                      <>
                        <li>• Light usage</li>
                        <li>• Bulk storage OK</li>
                        <li>• Try it out</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-brand-beige-dark rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-semibold">Flexibility Promise</h3>
        </div>
        <ul className="text-sm text-brand-neutral-600 space-y-1">
          <li>• Change frequency anytime from your dashboard</li>
          <li>• Pause or skip deliveries when needed</li>
          <li>• Cancel anytime with no penalties</li>
          <li>• Free shipping on all subscription orders</li>
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-center">
          {selected && (
            <p className="text-sm text-brand-neutral-600 mb-2">
              Selected: {selected.label}
              {selected.discount > 0 && (
                <span className="text-brand-coral font-medium"> ({selected.discount}% off)</span>
              )}
            </p>
          )}
        </div>
        
        <Button onClick={handleNext} size="lg" disabled={!selected}>
          Next: Review Order
        </Button>
      </div>
    </motion.div>
  )
}