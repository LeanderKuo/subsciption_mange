-- Add auto_renew column to subscriptions table
ALTER TABLE subscriptions
ADD COLUMN IF NOT EXISTS auto_renew BOOLEAN DEFAULT false;

-- Create price_changes table for tracking price history
CREATE TABLE IF NOT EXISTS price_changes (
  id BIGSERIAL PRIMARY KEY,
  subscription_id BIGINT NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  old_price NUMERIC(10, 2) NOT NULL,
  new_price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  effective_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_price_changes_subscription
ON price_changes(subscription_id);

CREATE INDEX IF NOT EXISTS idx_price_changes_user
ON price_changes(user_id);

-- Enable RLS for price_changes table
DO $$ BEGIN
  ALTER TABLE price_changes ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- RLS Policies with IF NOT EXISTS logic
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'price_changes' AND policyname = 'Users can view own price changes') THEN
    CREATE POLICY "Users can view own price changes"
    ON price_changes FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'price_changes' AND policyname = 'Users can insert own price changes') THEN
    CREATE POLICY "Users can insert own price changes"
    ON price_changes FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'price_changes' AND policyname = 'Users can update own price changes') THEN
    CREATE POLICY "Users can update own price changes"
    ON price_changes FOR UPDATE
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'price_changes' AND policyname = 'Users can delete own price changes') THEN
    CREATE POLICY "Users can delete own price changes"
    ON price_changes FOR DELETE
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Add comment for documentation
COMMENT ON COLUMN subscriptions.auto_renew IS 'Whether the subscription automatically renews';
COMMENT ON TABLE price_changes IS 'Tracks subscription price changes over time';
COMMENT ON COLUMN price_changes.effective_date IS 'Date when the new price becomes effective';
