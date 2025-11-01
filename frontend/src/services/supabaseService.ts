import { supabase } from "./supabaseClient";
import { Subscription, SubscriptionInput } from "../types/subscription";
import {
  mapSubscriptionRecord,
  mapSubscriptionWrite,
  requireAuthUser,
} from "./serviceUtils";

const SUBSCRIPTIONS_TABLE = "subscriptions";

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const user = await requireAuthUser();

  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select("*")
    .eq("user_id", user.id);

  if (error) throw error;
  return (data ?? []).map(mapSubscriptionRecord);
};

export const createSubscription = async (
  payload: SubscriptionInput
): Promise<Subscription> => {
  const user = await requireAuthUser();
  const insertPayload = mapSubscriptionWrite(payload, user.id);

  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;
  return mapSubscriptionRecord(data);
};

export const updateSubscription = async (
  subscription: Subscription
): Promise<Subscription> => {
  const user = await requireAuthUser();
  const { id } = subscription;
  const updatePayload = mapSubscriptionWrite(subscription);

  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .update(updatePayload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw error;
  return mapSubscriptionRecord(data);
};

export const deleteSubscription = async (id: number): Promise<void> => {
  const user = await requireAuthUser();

  const { error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
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
