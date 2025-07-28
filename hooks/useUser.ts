import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types'

const fetchUser = async (): Promise<User> => {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }
  return response.json()
}

const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  if (!response.ok) {
    throw new Error('Failed to update user')
  }
  return response.json()
}

export const useUser = () => {
  return useQuery(['user'], fetchUser)
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
    },
  })
}