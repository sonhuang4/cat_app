'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { PetProfile } from '@/types'
import { ACTIVITY_LEVELS, HEALTH_CONCERNS, PREFERENCES } from '@/lib/constants'

const petProfileSchema = z.object({
  name: z.string().min(1, 'Pet name is required'),
  age: z.number().min(0, 'Age must be a positive number').max(25, 'Age seems too high'),
  weight: z.number().min(1, 'Weight must be a positive number').max(50, 'Weight seems too high'),
  activityLevel: z.enum(['low', 'medium', 'high']),
  healthConcerns: z.array(z.string()),
  preferences: z.array(z.string()),
})

interface PetProfileStepProps {
  initialData?: Partial<PetProfile>
  onNext: (data: PetProfile) => void
}

export default function PetProfileStep({ initialData, onNext }: PetProfileStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PetProfile>({
    resolver: zodResolver(petProfileSchema),
    defaultValues: {
      name: initialData?.name || '',
      age: initialData?.age || 0,
      weight: initialData?.weight || 0,
      activityLevel: initialData?.activityLevel || 'medium',
      healthConcerns: initialData?.healthConcerns || [],
      preferences: initialData?.preferences || [],
    },
    mode: 'onChange',
  })

  const watchedHealthConcerns = watch('healthConcerns') || []
  const watchedPreferences = watch('preferences') || []

  const toggleArrayValue = (array: string[], value: string, setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value))
    } else {
      setter([...array, value])
    }
  }

  const onSubmit = (data: PetProfile) => {
    onNext(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Tell Us About Your Cat</h2>
        <p className="text-brand-neutral-600">
          This helps us recommend the perfect products for your feline friend
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Cat's Name"
            placeholder="Whiskers"
            {...register('name')}
            error={errors.name?.message}
          />
          
          <Input
            label="Age (years)"
            type="number"
            placeholder="3"
            {...register('age', { valueAsNumber: true })}
            error={errors.age?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Weight (lbs)"
            type="number"
            placeholder="10"
            {...register('weight', { valueAsNumber: true })}
            error={errors.weight?.message}
          />
          
          <Select
            label="Activity Level"
            options={ACTIVITY_LEVELS.map(level => ({
              value: level.value,
              label: `${level.label} - ${level.description}`,
            }))}
            {...register('activityLevel')}
            error={errors.activityLevel?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-neutral-700 mb-3">
            Health Concerns (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {HEALTH_CONCERNS.map((concern) => (
              <label
                key={concern}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  watchedHealthConcerns.includes(concern)
                    ? 'border-brand-coral bg-brand-coral/5'
                    : 'border-brand-neutral-200 hover:border-brand-coral/50'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={watchedHealthConcerns.includes(concern)}
                  onChange={() =>
                    toggleArrayValue(
                      watchedHealthConcerns,
                      concern,
                      (arr) => setValue('healthConcerns', arr)
                    )
                  }
                />
                <span className="text-sm">{concern}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-neutral-700 mb-3">
            Preferences (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PREFERENCES.map((preference) => (
              <label
                key={preference}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  watchedPreferences.includes(preference)
                    ? 'border-brand-teal bg-brand-teal/5'
                    : 'border-brand-neutral-200 hover:border-brand-teal/50'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={watchedPreferences.includes(preference)}
                  onChange={() =>
                    toggleArrayValue(
                      watchedPreferences,
                      preference,
                      (arr) => setValue('preferences', arr)
                    )
                  }
                />
                <span className="text-sm">{preference}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg" disabled={!isValid}>
            Next: Choose Litter
          </Button>
        </div>
      </form>
    </motion.div>
  )
}