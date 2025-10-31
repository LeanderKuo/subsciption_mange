export type BillingCycle = '30days' | '6months' | '1year';

export interface Subscription {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: BillingCycle;
  iconUrl?: string | null;
  autoRenew?: boolean; // Auto-renew flag
  categoryId?: number | null; // Optional category reference
}

export interface PriceChange {
  id: number;
  subscriptionId: number;
  userId: string;
  oldPrice: number;
  newPrice: number;
  currency: string;
  effectiveDate: string; // Date when the new price takes effect
  createdAt: string;
}

export type SubscriptionInput = Omit<Subscription, 'id'>;

export interface UserProfile {
  id: string;
  email: string | null;
  nickname: string | null;
  defaultCurrency: string;
  createdAt: string;
  updatedAt: string;
}

export type UserProfileInput = Partial<Pick<UserProfile, 'email' | 'nickname' | 'defaultCurrency'>>;

export interface SubscriptionCategory {
  id: number;
  userId: string;
  name: string;
  description?: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionCategoryInput = Omit<SubscriptionCategory, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;
