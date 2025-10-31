-- Update brands_cache table to use monthly caching instead of daily
-- Change fetched_date (DATE) to fetched_month (TEXT in YYYY-MM format)

-- Drop the old fetched_date column and add fetched_month
ALTER TABLE brands_cache
DROP COLUMN IF EXISTS fetched_date,
ADD COLUMN IF NOT EXISTS fetched_month TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_DATE, 'YYYY-MM');

-- Create index for faster queries on fetched_month
CREATE INDEX IF NOT EXISTS idx_brands_cache_fetched_month
ON brands_cache(fetched_month);

-- Add comment for documentation
COMMENT ON COLUMN brands_cache.fetched_month IS 'Month when brand data was fetched (format: YYYY-MM). Cache refreshes monthly.';
