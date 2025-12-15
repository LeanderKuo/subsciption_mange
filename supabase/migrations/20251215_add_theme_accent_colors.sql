-- Add accent color columns to user_profiles for theme customization
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS dark_accent_color TEXT DEFAULT '#34b27b',
ADD COLUMN IF NOT EXISTS light_accent_color TEXT DEFAULT '#1976d2';

-- Add comments for documentation
COMMENT ON COLUMN user_profiles.dark_accent_color IS 'User custom accent color for dark theme (hex format)';
COMMENT ON COLUMN user_profiles.light_accent_color IS 'User custom accent color for light theme (hex format)';
