import { supabase } from './supabaseClient';
import { SubscriptionCategory, SubscriptionCategoryInput } from '../types/subscription';
import {
  mapCategoryInsert,
  mapCategoryPatch,
  mapCategoryRecord,
  requireAuthUser,
} from './serviceUtils';

// Fetch all categories for current user
export const fetchCategories = async (): Promise<SubscriptionCategory[]> => {
  const user = await requireAuthUser();

  const { data, error } = await supabase
    .from('subscription_categories')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true });

  if (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }

  return (data ?? []).map(mapCategoryRecord);
};

// Create a new category
export const createCategory = async (
  category: SubscriptionCategoryInput
): Promise<SubscriptionCategory> => {
  const user = await requireAuthUser();

  const { data, error } = await supabase
    .from('subscription_categories')
    .insert(mapCategoryInsert(category, user.id))
    .select()
    .single();

  if (error) {
    console.error('Failed to create category:', error);
    throw error;
  }

  return mapCategoryRecord(data);
};

// Update a category
export const updateCategory = async (
  id: number,
  updates: Partial<SubscriptionCategoryInput>
): Promise<SubscriptionCategory> => {
  const user = await requireAuthUser();
  const updateData = mapCategoryPatch(updates);

  const { data, error } = await supabase
    .from('subscription_categories')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Failed to update category:', error);
    throw error;
  }

  return mapCategoryRecord(data);
};

// Delete a category
export const deleteCategory = async (id: number): Promise<void> => {
  const user = await requireAuthUser();

  const { error } = await supabase
    .from('subscription_categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Failed to delete category:', error);
    throw error;
  }
};
