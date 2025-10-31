import { supabase } from './supabaseClient';
import { SubscriptionCategory, SubscriptionCategoryInput } from '../types/subscription';

// Fetch all categories for current user
export const fetchCategories = async (): Promise<SubscriptionCategory[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('subscription_categories')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true });

  if (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }

  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    name: item.name,
    description: item.description,
    color: item.color,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};

// Create a new category
export const createCategory = async (
  category: SubscriptionCategoryInput
): Promise<SubscriptionCategory> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('subscription_categories')
    .insert({
      user_id: user.id,
      name: category.name,
      description: category.description || null,
      color: category.color || '#000000',
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create category:', error);
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    description: data.description,
    color: data.color,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

// Update a category
export const updateCategory = async (
  id: number,
  updates: Partial<SubscriptionCategoryInput>
): Promise<SubscriptionCategory> => {
  const updateData: Record<string, unknown> = {};

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.color !== undefined) updateData.color = updates.color;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('subscription_categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Failed to update category:', error);
    throw error;
  }

  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    description: data.description,
    color: data.color,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

// Delete a category
export const deleteCategory = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('subscription_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Failed to delete category:', error);
    throw error;
  }
};
