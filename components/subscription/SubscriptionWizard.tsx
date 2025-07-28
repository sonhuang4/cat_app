'use client'

import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import PetProfileStep from './PetProfileStep'
import LitterSelectionStep from './LitterSelectionStep'
import FoodSelectionStep from './FoodSelectionStep'
import FrequencyStep from './FrequencyStep'
import ReviewStep from './ReviewStep'
import { Product, PetProfile, FrequencyOption } from '@/types'

const steps = [
  'Pet Profile',
  'Choose Litter',
  'Choose Food',
  'Set Frequency',
  'Review Order',
]

export default function SubscriptionWizard() {
  const router = useRouter()
  const {
    petProfile,
    litterProduct,
    foodProduct,
    frequency,
    currentStep,
    setPetProfile,
    setLitterProduct,
    setFoodProduct,
    setFrequency,
    nextStep,
    previousStep,
    reset,
  } = useSubscriptionStore()

  const handlePetProfileNext = (data: PetProfile) => {
    setPetProfile(data)
    nextStep()
  }

  const handleLitterNext = (product: Product | null) => {
    setLitterProduct(product)
    nextStep()
  }

  const handleFoodNext = (product: Product | null) => {
    setFoodProduct(product)
    nextStep()
  }

  const handleFrequencyNext = (selectedFrequency: FrequencyOption) => {
    setFrequency(selectedFrequency)
    nextStep()
  }

  const handleComplete = () => {
    reset()
    router.push('/dashboard?welcome=true')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PetProfileStep
            initialData={petProfile || undefined}
            onNext={handlePetProfileNext}
          />
        )
      case 1:
        return (
          <LitterSelectionStep
            selectedProduct={litterProduct}
            onNext={handleLitterNext}
            onBack={previousStep}
          />
        )
      case 2:
        return (
          <FoodSelectionStep
            selectedProduct={foodProduct}
            onNext={handleFoodNext}
            onBack={previousStep}
          />
        )
      case 3:
        return (
          <FrequencyStep
            selectedFrequency={frequency}
            onNext={handleFrequencyNext}
            onBack={previousStep}
          />
        )
      case 4:
        return (
          petProfile && frequency && (litterProduct || foodProduct) ? (
            <ReviewStep
              petProfile={petProfile}
              litterProduct={litterProduct}
              foodProduct={foodProduct}
              frequency={frequency}
              onBack={previousStep}
              onComplete={handleComplete}
            />
          ) : null
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-brand-beige py-8">
      <div className="container">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    index <= currentStep
                      ? 'bg-brand-coral text-white'
                      : 'bg-brand-neutral-200 text-brand-neutral-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      index < currentStep ? 'bg-brand-coral' : 'bg-brand-neutral-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-brand-neutral-600">
            {steps.map((step, index) => (
              <span
                key={step}
                className={`${
                  index === currentStep ? 'text-brand-coral font-medium' : ''
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  )
}