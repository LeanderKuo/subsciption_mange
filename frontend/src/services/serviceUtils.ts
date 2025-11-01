import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import type {
  Subscription,
  SubscriptionInput,
  SubscriptionCategory,
  SubscriptionCategoryInput,
} from '../types/subscription';

export const requireAuthUser = async (): Promise<User> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  return user;
};

type SubscriptionSource = Subscription | SubscriptionInput;

export const mapSubscriptionRecord = (record: any): Subscription => ({
  id: record.id,
  name: record.name,
  brand: record.brand,
  price: record.price,
  currency: record.currency,
  startDate: record.start_date,
  endDate: record.end_date,
  cycle: record.cycle,
  iconUrl: record.icon_url,
  autoRenew: record.auto_renew,
  categoryId: record.category_id,
});

export const mapSubscriptionWrite = (
  input: SubscriptionSource,
  userId?: string
) => {
  const basePayload = {
    name: input.name,
    brand: input.brand,
    price: input.price,
    currency: input.currency,
    start_date: input.startDate,
    end_date: input.endDate,
    cycle: input.cycle,
    icon_url: input.iconUrl ?? null,
    auto_renew: input.autoRenew ?? null,
    category_id: input.categoryId ?? null,
  };

  return userId ? { ...basePayload, user_id: userId } : basePayload;
};

export const mapCategoryRecord = (record: any): SubscriptionCategory => ({
  id: record.id,
  userId: record.user_id,
  name: record.name,
  description: record.description,
  color: record.color,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

export const mapCategoryInsert = (
  category: SubscriptionCategoryInput,
  userId: string
) => ({
  user_id: userId,
  name: category.name,
  description: category.description ? category.description : null,
  color: category.color ? category.color : '#000000',
});

export const mapCategoryPatch = (
  updates: Partial<SubscriptionCategoryInput>
) => {
  const patch: Record<string, unknown> = {};

  if (updates.name !== undefined) {
    patch.name = updates.name;
  }

  if (updates.description !== undefined) {
    patch.description = updates.description ? updates.description : null;
  }

  if (updates.color !== undefined) {
    patch.color = updates.color;
  }

  patch.updated_at = new Date().toISOString();

  return patch;
};
