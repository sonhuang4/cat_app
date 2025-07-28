import { create } from 'zustand'
import { User } from '@/types'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (email: string) => Promise<void>
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: async (email) => {
    // Mock login - in real app would call auth API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      subscriptions: [],
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
}))