export interface Product {
  id: string;
  name: string;
  type: 'litter' | 'food';
  description: string;
  price: number;
  image: string;
  brand: string;
  weight?: string;
  ingredients?: string[];
  features?: string[];
  frequencyOptions: FrequencyOption[];
}

export interface FrequencyOption {
  weeks: number;
  label: string;
  discount: number;
}

export interface PetProfile {
  name: string;
  age: number;
  weight: number;
  activityLevel: 'low' | 'medium' | 'high';
  healthConcerns: string[];
  preferences: string[];
}

export interface Subscription {
  id: string;
  userId: string;
  petProfile: PetProfile;
  litterProduct: Product | null;
  foodProduct: Product | null;
  frequency: FrequencyOption;
  status: 'active' | 'paused' | 'cancelled';
  nextDelivery: Date;
  totalPrice: number;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptions: Subscription[];
  referralCode: string;
  referredBy?: string;
}

export interface Referral {
  code: string;
  userId: string;
  invitedCount: number;
  signedUpCount: number;
  rewards: ReferralReward[];
}

export interface ReferralReward {
  id: string;
  amount: number;
  type: 'discount' | 'credit';
  status: 'pending' | 'claimed';
  earnedDate: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  petName: string;
  image?: string;
}