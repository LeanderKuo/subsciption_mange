import { supabase } from "./supabaseClient";
import { Subscription, SubscriptionInput } from "../types/subscription";

type SubscriptionRecord = {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  start_date: string;
  end_date: string;
  cycle: string;
  icon_url?: string | null;
};

const mapFromApi = (record: SubscriptionRecord): Subscription => ({
  id: record.id,
  name: record.name,
  brand: record.brand,
  price: record.price,
  currency: record.currency,
  startDate: record.start_date,
  endDate: record.end_date,
  cycle: record.cycle as Subscription["cycle"],
  iconUrl: record.icon_url ?? null,
});

const mapToApi = (
  input: SubscriptionInput
): Omit<SubscriptionRecord, "id"> => ({
  name: input.name,
  brand: input.brand,
  price: input.price,
  currency: input.currency,
  start_date: input.startDate,
  end_date: input.endDate,
  cycle: input.cycle,
  icon_url: input.iconUrl ?? null,
});

const addIconUrl = (subscription: Subscription): Subscription => ({
  ...subscription,
  iconUrl:
    subscription.iconUrl ||
    `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${subscription.brand}.svg`,
});

export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("end_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(mapFromApi).map(addIconUrl);
};

export const createSubscription = async (
  payload: SubscriptionInput
): Promise<Subscription> => {
  const newRecord = mapToApi(payload);

  const { data, error } = await supabase
    .from("subscriptions")
    .insert(newRecord)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return addIconUrl(mapFromApi(data));
};

export const updateSubscription = async (
  subscription: Subscription
): Promise<Subscription> => {
  const { id, ...rest } = subscription;
  const updates = mapToApi(rest);

  const { data, error } = await supabase
    .from("subscriptions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return addIconUrl(mapFromApi(data));
};

export const deleteSubscription = async (id: number): Promise<void> => {
  const { error } = await supabase.from("subscriptions").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
