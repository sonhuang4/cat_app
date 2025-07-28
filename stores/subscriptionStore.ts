import { create } from 'zustand'
import { Product, PetProfile, FrequencyOption } from '@/types'

interface SubscriptionState {
  petProfile: PetProfile | null
  litterProduct: Product | null
  foodProduct: Product | null
  frequency: FrequencyOption | null
  currentStep: number
  
  setPetProfile: (profile: PetProfile) => void
  setLitterProduct: (product: Product | null) => void
  setFoodProduct: (product: Product | null) => void
  setFrequency: (frequency: FrequencyOption) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void
  getTotalPrice: () => number
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  petProfile: null,
  litterProduct: null,
  foodProduct: null,
  frequency: null,
  currentStep: 0,
  
  setPetProfile: (profile) => set({ petProfile: profile }),
  setLitterProduct: (product) => set({ litterProduct: product }),
  setFoodProduct: (product) => set({ foodProduct: product }),
  setFrequency: (frequency) => set({ frequency: frequency }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  
  reset: () => set({
    petProfile: null,
    litterProduct: null,
    foodProduct: null,
    frequency: null,
    currentStep: 0,
  }),
  
  getTotalPrice: () => {
    const state = get()
    const litterPrice = state.litterProduct?.price || 0
    const foodPrice = state.foodProduct?.price || 0
    const subtotal = litterPrice + foodPrice
    const discount = state.frequency?.discount || 0
    return subtotal * (1 - discount / 100)
  },
}))