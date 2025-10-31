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
  autoRenew?: boolean; // 自動續訂
}

export interface PriceChange {
  id: number;
  subscriptionId: number;
  userId: string;
  oldPrice: number;
  newPrice: number;
  currency: string;
  effectiveDate: string; // 價格生效日期
  createdAt: string;
}

export type SubscriptionInput = Omit<Subscription, 'id'>;
