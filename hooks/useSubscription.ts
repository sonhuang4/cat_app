import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Subscription } from '@/types'

const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const response = await fetch('/api/subscription')
  if (!response.ok) {
    throw new Error('Failed to fetch subscriptions')
  }
  return response.json()
}

const createSubscription = async (subscriptionData: Partial<Subscription>): Promise<Subscription> => {
  const response = await fetch('/api/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  })
  if (!response.ok) {
    throw new Error('Failed to create subscription')
  }
  return response.json()
}

const updateSubscription = async (subscriptionData: Partial<Subscription>): Promise<Subscription> => {
  const response = await fetch('/api/subscription', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  })
  if (!response.ok) {
    throw new Error('Failed to update subscription')
  }
  return response.json()
}

export const useSubscriptions = () => {
  return useQuery(['subscriptions'], fetchSubscriptions)
}

export const useCreateSubscription = () => {
  const queryClient = useQueryClient()
  
  return useMutation(createSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subscriptions'])
      queryClient.invalidateQueries(['user'])
    },
  })
}

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient()
  
  return useMutation(updateSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subscriptions'])
      queryClient.invalidateQueries(['user'])
    },
  })
}