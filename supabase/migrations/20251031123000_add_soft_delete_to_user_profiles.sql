-- Add soft delete columns to user_profiles
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS deleted_reason TEXT;

CREATE INDEX IF NOT EXISTS idx_user_profiles_deleted_at
ON user_profiles(deleted_at);

COMMENT ON COLUMN user_profiles.deleted_at IS 'Timestamp indicating when the profile was soft deleted';
COMMENT ON COLUMN user_profiles.deleted_reason IS 'Optional reason provided when the profile was soft deleted';
