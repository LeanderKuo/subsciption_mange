-- Create subscription_categories table for user-defined subscription types
CREATE TABLE IF NOT EXISTS subscription_categories (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#000000',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Add category_id to subscriptions table
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES subscription_categories(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_subscription_categories_user_id
ON subscription_categories(user_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_category_id
ON subscriptions(category_id);

-- Enable Row Level Security
ALTER TABLE subscription_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscription_categories
CREATE POLICY "Users can view their own categories"
ON subscription_categories FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own categories"
ON subscription_categories FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
ON subscription_categories FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
ON subscription_categories FOR DELETE
USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE subscription_categories IS 'User-defined categories for organizing subscriptions (e.g., AI Services, Video Streaming, etc.)';
COMMENT ON COLUMN subscription_categories.color IS 'Hex color code for category display (e.g., #FF5733)';
