import { supabase } from "./supabaseClient";
import { Subscription, SubscriptionInput } from "../types/subscription";

// Supabase-based data access helpers
// Assumes the table name is 'subscriptions'; adjust field names as needed.

const mapFromSupabase = (record: any): Subscription => ({
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

const mapToSupabase = (input: SubscriptionInput) => ({
  name: input.name,
  brand: input.brand,
  price: input.price,
  currency: input.currency,
  start_date: input.startDate,
  end_date: input.endDate,
  cycle: input.cycle,
  icon_url: input.iconUrl,
  auto_renew: input.autoRenew,
  category_id: input.categoryId,
});

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  return data.map(mapFromSupabase);
};

export const createSubscription = async (
  payload: SubscriptionInput
): Promise<Subscription> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("subscriptions")
    .insert([{ ...mapToSupabase(payload), user_id: user.id }])
    .select()
    .single();

  if (error) throw error;
  return mapFromSupabase(data);
};

export const updateSubscription = async (
  subscription: Subscription
): Promise<Subscription> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { id, ...rest } = subscription;
  const { data, error } = await supabase
    .from("subscriptions")
    .update(mapToSupabase(rest))
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return mapFromSupabase(data);
};

export const deleteSubscription = async (id: number): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase
    .from("subscriptions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
};

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// OAuth helpers
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
  if (error) throw error;
  return data;
};

export const signInWithApple = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Returns the current authenticated user
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
