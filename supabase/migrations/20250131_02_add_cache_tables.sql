-- Create exchange_rates cache table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id BIGSERIAL PRIMARY KEY,
  base_currency TEXT NOT NULL DEFAULT 'USD',
  target_currency TEXT NOT NULL,
  rate NUMERIC(12, 6) NOT NULL,
  fetched_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(base_currency, target_currency, fetched_date)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_exchange_rates_currencies_date
ON exchange_rates(base_currency, target_currency, fetched_date);

-- Create brands_cache table for brand icon and name
CREATE TABLE IF NOT EXISTS brands_cache (
  id BIGSERIAL PRIMARY KEY,
  domain TEXT NOT NULL UNIQUE,
  brand_name TEXT,
  icon_url TEXT,
  brand_id TEXT,
  fetched_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_brands_cache_domain_date
ON brands_cache(domain, fetched_date);

-- Enable RLS for exchange_rates table (public read, admin write)
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read exchange rates
CREATE POLICY "Anyone can view exchange rates"
ON exchange_rates FOR SELECT
TO authenticated
USING (true);

-- Allow service role to insert/update exchange rates
CREATE POLICY "Service role can manage exchange rates"
ON exchange_rates FOR ALL
TO service_role
USING (true);

-- Enable RLS for brands_cache table (public read, admin write)
ALTER TABLE brands_cache ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read brands cache
CREATE POLICY "Anyone can view brands cache"
ON brands_cache FOR SELECT
TO authenticated
USING (true);

-- Allow service role to insert/update brands cache
CREATE POLICY "Service role can manage brands cache"
ON brands_cache FOR ALL
TO service_role
USING (true);

-- Add comments for documentation
COMMENT ON TABLE exchange_rates IS 'Daily cache of currency exchange rates from ExchangeRate API';
COMMENT ON COLUMN exchange_rates.fetched_date IS 'Date when the rate was fetched (used for daily caching)';
COMMENT ON TABLE brands_cache IS 'Daily cache of brand information from Brandfetch API';
COMMENT ON COLUMN brands_cache.fetched_date IS 'Date when the brand info was fetched (used for daily caching)';
