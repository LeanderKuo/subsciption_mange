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
}

export type SubscriptionInput = Omit<Subscription, 'id'>;
