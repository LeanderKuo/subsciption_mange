export type CycleUnit = "days" | "months" | "years";
export type PresetBillingCycle = "30days" | "6months" | "1year";
export type CustomBillingCycle = `custom:${CycleUnit}:${number}`;

export type BillingCycle = PresetBillingCycle | CustomBillingCycle;

export interface Subscription {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  cycle: BillingCycle;
  billingPeriod?: "monthly" | "yearly" | "half-yearly" | "custom";
  customDuration?: { years: number; months: number };
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

export type SubscriptionInput = Omit<Subscription, "id">;

export interface UserProfile {
  id: string;
  email: string | null;
  nickname: string | null;
  defaultCurrency: string;
  darkAccentColor: string;
  lightAccentColor: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export type UserProfileInput = Partial<
  Pick<
    UserProfile,
    | "email"
    | "nickname"
    | "defaultCurrency"
    | "darkAccentColor"
    | "lightAccentColor"
  >
>;

export interface SubscriptionCategory {
  id: number;
  userId: string;
  name: string;
  description?: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionCategoryInput = Omit<
  SubscriptionCategory,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
