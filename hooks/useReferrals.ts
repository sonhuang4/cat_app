import { useQuery, useMutation } from '@tanstack/react-query'
import { Referral } from '@/types'

const fetchReferrals = async (): Promise<Referral> => {
  const response = await fetch('/api/referrals')
  if (!response.ok) {
    throw new Error('Failed to fetch referrals')
  }
  return response.json()
}

const sendReferralInvite = async (email: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch('/api/referrals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  if (!response.ok) {
    throw new Error('Failed to send referral invitation')
  }
  return response.json()
}

export const useReferrals = () => {
  return useQuery(['referrals'], fetchReferrals)
}

export const useSendReferralInvite = () => {
  return useMutation(sendReferralInvite)
}