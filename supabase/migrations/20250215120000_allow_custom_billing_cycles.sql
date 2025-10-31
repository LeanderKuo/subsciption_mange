-- Allow custom billing cycles stored as custom:<unit>:<amount>
ALTER TABLE subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_cycle_check;

ALTER TABLE subscriptions
  ADD CONSTRAINT subscriptions_cycle_check
  CHECK (
    cycle IN ('30days', '6months', '1year')
    OR cycle LIKE 'custom:days:%'
    OR cycle LIKE 'custom:months:%'
    OR cycle LIKE 'custom:years:%'
  );
